const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MCQ = require('./models/MCQ');
const CodingQuestion = require('./models/CodingQuestion');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/placeprep';
const qsPath = path.join(__dirname, 'data', 'questions.json');

async function migrate() {
  try {
    console.log('Connecting to MongoDB at', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('Connected.');

    if (fs.existsSync(qsPath)) {
      const qData = JSON.parse(fs.readFileSync(qsPath, 'utf-8'));
      
      console.log(`Found ${qData.length} questions in local JSON.`);
      
      let mcqCount = 0;
      let codingCount = 0;

      for (const q of qData) {
        if (q.type === 'Coding') {
          const exists = await CodingQuestion.findOne({ id: q.id });
          if (!exists) {
            await CodingQuestion.create(q);
            codingCount++;
          }
        } else {
          const exists = await MCQ.findOne({ id: q.id });
          if (!exists) {
            await MCQ.create(q);
            mcqCount++;
          }
        }
      }

      console.log(`Migration complete! Added ${mcqCount} MCQs and ${codingCount} Coding Questions.`);
    } else {
      console.log('No local data/questions.json found. Nothing to migrate.');
    }
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    mongoose.disconnect();
  }
}

migrate();
