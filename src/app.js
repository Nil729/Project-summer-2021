import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import exphbs from 'express-handlebars';
import methodOverride from 'method-override';
import session from 'express-session';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
//import passport from "passport";

const app = express();
import reguistrosRoutes from './routes/reguistros.routes';
import statusRutes from './routes/status.routes';
import './config';
import './conf/passport';

//Setings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main.hbs' ,
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

//Midelware
const corsOptions = {};
app.use(cors({corsOptions}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use(session({
    secret: 'secretA',
    resave: true,
    saveUninitialized: true
}))
//app.use(passport.initialize());

app.use(cookieParser());
app.use(flash());

// Global Variables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

//Routes

app.use('/', reguistrosRoutes);

app.use('/api/Status', statusRutes);

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Fer una ruta que contingi un ranking contes de instagram.

export default app;