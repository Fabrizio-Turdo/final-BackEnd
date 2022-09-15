import express from 'express';
import morgan from 'morgan';
import MongoStore from "connect-mongo";
import session from 'express-session';
// ---->
import passport from "passport";
import './passport/local'
import './mongooseConnection/mongooseConnection'
import 'dotenv/config';


const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const DB_NAME = process.env.DB_NAME;


const app = express();

//Middlewares
app.use(express.json());
app.use(morgan('dev'));



app.use(express.urlencoded({ extended: true }));
app.use(session(
    {
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.cyfup.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
            ttl: 60 * 10 // 10 minutes
        })
    }
));
app.use(passport.initialize()) //creo que este es para que funcione passport
app.use(passport.session())//para que session funcione con passport
app.use('/datos',zapatillasRoutes,cartRoutes)


//Ubicacion de los templates
app.set('views', 'src/views');
app.set('view engine', 'ejs');


/** Routes */
import zapatillasRoutes from './router/zapatillas';
import cartRoutes from './router/cart';
import homeRouter from '../src/router/home.js';
import loginRouter from '../src/router/login.js';
import logoutRouter from '../src/router/logout.js';

app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/zapatillas', zapatillasRoutes);
app.use('/cart', cartRoutes);





//Inicio Servidor
const PORT = 8080;
app.listen(PORT,()=>{
    console.log(`Escuchando el puerto: ${PORT}`)
});