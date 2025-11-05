// const mongoose = require("mongoose")

// 1. Source DB (your DB)
const source = mongoose.createConnection("mongodb+srv://anuu123:l9nrZYHLNRmdMCx5@cluster0.nldhhm2.mongodb.net/tedx?retryWrites=true&w=majority&appName=Cluster0");

// 2. Target DB (other user's DB)
const target = mongoose.createConnection("mongodb+srv://tedxthaltejyouthofficial:exK4TTAC5DOz2BBf@cluster0.pwxzlle.mongodb.net/tedx?retryWrites=true&w=majority&appName=Cluster0");

// 3. Function to copy one collection
const copyCollection = async (collectionName) => {
  const schema = new mongoose.Schema({}, { strict: false });
  const SourceModel = source.model(collectionName, schema, collectionName);
  const TargetModel = target.model(collectionName, schema, collectionName);

  const data = await SourceModel.find();
  if (data.length) {
    await TargetModel.insertMany(data);
    console.log(`✅ Copied ${collectionName} (${data.length} docs)`);
  } else {
    console.log(`⚠️ No data in ${collectionName}`);
  }
};

// 4. Get all collections from source DB and copy them
source.once("open", async () => {
  target.once("open", async () => {
    try {
      const collections = await source.db.listCollections().toArray();
      for (const coll of collections) {
        try {
          await copyCollection(coll.name);
        } catch (err) {
          console.error(`❌ Error copying ${coll.name}:`, err.message);
        }
      }
      console.log("🎉 All collections copied!");
    } catch (err) {
      console.error("❌ Error listing collections:", err.message);
    } finally {
      process.exit();
    }
  });
});
