const morgan=require('morgan');
const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const errorMiddleware=require('./middlewares/error');
const cors=require('cors');

const fileUpload=require('express-fileupload');

// importing routes
const productRoutes=require('./routes/productRoutes');
const userRoutes=require('./routes/userRoutes');
const orderRoutes=require('./routes/orderRoutes');
const contactFormRoutes=require('./routes/contactFormRoutes');

// using middlewares
app.use(express.json({limit:'50mb', extended: true}));
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(cors({origin: true, credentials: true, }));
app.use(fileUpload());
app.use(express.urlencoded({limit:'50mb',extended:true}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });


// getting routes
app.use('/',productRoutes);
app.use('/',userRoutes);
app.use('/',orderRoutes);
app.use('/',contactFormRoutes);


// custom middlewares
app.use(errorMiddleware);

module.exports =app;