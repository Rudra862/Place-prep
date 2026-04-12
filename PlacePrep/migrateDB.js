const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const User = require('./models/User');
const History = require('./models/History');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/placeprep';
const dbPath = path.join(__dirname, 'data', 'db.json');

async function migrate() {
  try {
    console.log('Connecting to MongoDB at', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('Connected.');

    if (fs.existsSync(dbPath)) {
      const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
      
      console.log(`Found ${dbData.users?.length || 0} users and ${dbData.history?.length || 0} history records in local DB.`);
      
      if (dbData.users && dbData.users.length > 0) {
        // Find existing users to avoid duplicates
        for (const u of dbData.users) {
          const exists = await User.findOne({ email: u.email });
          if (!exists) {
            await User.create(u);
            console.log(`Migrated user: ${u.email}`);
          } else {
            console.log(`Skipped existing user: ${u.email}`);
          }
        }
      }

      if (dbData.history && dbData.history.length > 0) {
        for (const h of dbData.history) {
          const exists = await History.findOne({ id: h.id });
          if (!exists) {
            await History.create(h);
            console.log(`Migrated history record: ${h.id}`);
          } else {
            console.log(`Skipped existing history: ${h.id}`);
          }
        }
      }
      console.log('Migration complete!');
    } else {
      console.log('No local data/db.json found. Nothing to migrate.');
    }
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    mongoose.disconnect();
  }
}

migrate();
