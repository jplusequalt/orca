const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;
console.log(`Connecting to ${url}`);

mongoose.connect(url)
  .then(_ => console.log('Connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDb: ', error));

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  assignee: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
});

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Task', taskSchema);