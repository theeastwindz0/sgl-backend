const mongoose = require('mongoose');
const DB =
  'mongodb+srv://ArcTechnologies:sRJxjCM2MGpXFYwd@cluster0.gmldelf.mongodb.net/?retryWrites=true&w=majority';
mongoose.set('strictQuery', false);
mongoose
  .connect(DB)
  .then(() => {
    console.log('db connected');
  })
  .catch((err) => console.log(err));
