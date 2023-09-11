
const mongoose = require('mongoose');

const mongoDB = 'mongodb+srv://pavseyash494:PASS%40123@cluster0.e3r2w9c.mongodb.net/Signup?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoDB, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
      
        const fetched_data = await mongoose.connection.db.collection("Data");
        const data = await fetched_data.find({}).toArray();
        console.log(data);
      }
      
      catch (error) {
        console.error('Error connecting to MongoDB:', error);
      }
      
};

module.exports = connectDB;

