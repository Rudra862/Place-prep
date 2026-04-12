const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// Serve static frontend files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('mongoose');
const User = require('./models/User');
const History = require('./models/History');
const Feedback = require('./models/Feedback');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/placeprep';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB via Mongoose'))
  .catch(err => console.error('MongoDB connection error:', err));

// =======================
// ROUTES
// =======================

// 1. Auth: Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields are required.' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email is already registered.' });

    const newUser = await User.create({ id: Date.now().toString(), name, email, password });
    res.status(201).json({ user: { id: newUser.id, name: newUser.name, email: newUser.email } });
  } catch(err) {
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

// 2. Auth: Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    
    if (!user) return res.status(401).json({ error: 'Invalid credentials.' });
    res.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch(err) {
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// 3. User Test History
app.get('/api/users/:email/history', async (req, res) => {
  try {
    const { email } = req.params;
    const userHistory = await History.find({ email }).sort({ date: -1 });
    res.json(userHistory);
  } catch(err) {
    res.status(500).json({ error: 'Server error fetching history.' });
  }
});

// 4. Submit Test
app.post('/api/tests/submit', async (req, res) => {
  try {
    const { email, company, type, score, correct, wrong, skipped, total, timeTaken, breakdown } = req.body;
    if (!email) return res.status(400).json({ error: 'User email is required to submit test.' });

    const newRecord = await History.create({
      id: Date.now().toString(),
      email, company, type, score, correct, wrong, skipped, total, timeTaken, breakdown,
      date: new Date().toISOString()
    });

    res.status(201).json({ message: 'Test submitted successfully', record: newRecord });
  } catch(err) {
    res.status(500).json({ error: 'Server error submitting test.' });
  }
});

// 5. Global Leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    const histories = await History.find({});
    const usersHistData = {};

    for (const h of histories) {
      if (!usersHistData[h.email]) {
        const user = await User.findOne({ email: h.email });
        usersHistData[h.email] = { name: user ? user.name : h.email, tests: 0, totalScore: 0, bestScore: 0 };
      }
      const stat = usersHistData[h.email];
      stat.tests += 1;
      stat.totalScore += h.score;
      if (h.score > stat.bestScore) stat.bestScore = h.score;
    }

    const leaderboard = Object.values(usersHistData).map(u => ({
      name: u.name,
      tests: u.tests,
      avg: Math.round(u.totalScore / u.tests),
      best: u.bestScore
    }));

    leaderboard.sort((a, b) => b.avg - a.avg);
    res.json(leaderboard);
  } catch(err) {
    res.status(500).json({ error: 'Server error fetching leaderboard.' });
  }
});

// 6. Generic Questions API (mock datastore in code for speed)
app.get('/api/questions', (req, res) => {
  // Normally loaded from a file or DB. Reading from a JSON object mapped from frontend for simplicity.
  const qsRaw = fs.readFileSync(path.join(__dirname, 'data', 'questions.json'), 'utf-8');
  res.json(JSON.parse(qsRaw));
});

// 7. Companies API
app.get('/api/companies', (req, res) => {
  const compRaw = fs.readFileSync(path.join(__dirname, 'data', 'companies.json'), 'utf-8');
  res.json(JSON.parse(compRaw));
});

// Feedback Suggestion API
app.post('/api/feedback', async (req, res) => {
  try {
    const { email, suggestion } = req.body;
    if (!suggestion) return res.status(400).json({ error: 'Suggestion is empty.' });
    
    console.log(`[Feedback from ${email || 'Anonymous'}]: ${suggestion}`);
    
    // Persistently save to MongoDB
    await Feedback.create({
      email: email || 'Anonymous',
      suggestion
    });

    res.json({ success: true, message: 'Suggestion received successfully!' });
  } catch (err) {
    console.error('Error saving feedback:', err);
    res.status(500).json({ error: 'Server error saving feedback.' });
  }
});

// 8. Local Code Execution API (LeetCode Style Compiler)
app.post('/api/execute', (req, res) => {
  const { language, code, input } = req.body;
  if (!language || !code) return res.status(400).json({ error: 'Language and code are required.' });

  const tmpDir = path.join(__dirname, 'data', 'tmp');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const fName = `source_${Date.now()}_${Math.floor(Math.random()*1000)}`;
  let cmd = '';
  let filePath = '';
  let inputFilePath = '';

  const runWithInput = (baseCmd) => {
    if (input && input.trim()) {
      inputFilePath = path.join(tmpDir, `${fName}_in.txt`);
      fs.writeFileSync(inputFilePath, input);
      return `${baseCmd} < "${inputFilePath}"`;
    }
    return baseCmd;
  };

  if (language === 'python') {
    filePath = path.join(tmpDir, `${fName}.py`);
    fs.writeFileSync(filePath, code);
    cmd = runWithInput(`python "${filePath}"`);
  } else if (language === 'javascript') {
    filePath = path.join(tmpDir, `${fName}.js`);
    fs.writeFileSync(filePath, code);
    cmd = runWithInput(`node "${filePath}"`);
  } else if (language === 'java') {
    // Java requires the class name to be Main if it's public.
    filePath = path.join(tmpDir, `Main.java`);
    fs.writeFileSync(filePath, code);
    const runCmd = runWithInput(`java Main`);
    cmd = `cd "${tmpDir}" && javac Main.java && ${runCmd}`;
  } else if (language === 'cpp') {
    filePath = path.join(tmpDir, `${fName}.cpp`);
    const exePath = path.join(tmpDir, `${fName}.exe`);
    fs.writeFileSync(filePath, code);
    const runCmd = runWithInput(`"${exePath}"`);
    cmd = `g++ "${filePath}" -o "${exePath}" && ${runCmd}`;
  } else {
    return res.status(400).json({ error: 'Unsupported language' });
  }

  // Execute with a 10s strict timeout
  exec(cmd, { timeout: 10000 }, (error, stdout, stderr) => {
    // Cleanup temp files asynchronously 
    setTimeout(() => {
      try {
        if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
        if (inputFilePath && fs.existsSync(inputFilePath)) fs.unlinkSync(inputFilePath);
        if (language === 'java' && fs.existsSync(path.join(tmpDir, 'Main.class'))) fs.unlinkSync(path.join(tmpDir, 'Main.class'));
        if (language === 'cpp' && fs.existsSync(path.join(tmpDir, `${fName}.exe`))) fs.unlinkSync(path.join(tmpDir, `${fName}.exe`));
      } catch (e) {}
    }, 500);

    if (error && error.killed) {
      return res.json({ run: { output: stdout || '', stderr: 'Error: Execution Timed Out (>10s).\n💡 Tip: If your code uses Scanner/cin/input(), make sure to write test data in the Custom Input box!' } });
    }
    
    res.json({ run: { output: stdout || '', stderr: stderr || (error && error.code !== 0 ? error.message : '') } });
  });
});

// Global Fallback to index.html (SPA routing, even though we separated files)
// For a hackathon simple setup, we strictly separated index.html and dashboard.html,
// so serving static gets us most of the way there.

app.listen(PORT, () => {
  console.log(`PlacePrep Hackathon API running on http://localhost:${PORT}`);
});
