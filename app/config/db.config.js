const mongoose = require("mongoose");
const myEnv = require("./conf");

const CONNECTION_STRING = `mongodb+srv://${myEnv.MONGODB_USER}:${myEnv.MONGODB_PWD}@${myEnv.MONGODB_CLUSTER}/${myEnv.MONGODB_DATABASE}`;

async function DbConnect() {
  try {
    const _db = await mongoose.connect(CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`🟢 connected to Atlas Cluster`);
    return _db;
  } catch (e) {
    console.warn(e.errorResponse);
    return e;
  }
}

module.exports = { DbConnect };
