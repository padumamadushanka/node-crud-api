const mongoose = require('mongoose');
const express=require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const app=express();
require('dotenv').config();
//import routes
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');

//db connection
mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true}
  )
  .then(() => console.log('DB Connected'))
   
  mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });

  // middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
//routes middleware
app.use('/api',userRoutes);
app.use('/api',productRoutes);

const port=process.env.PORT;

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})