//npm i express body-parser
const port =3012;
const express=require('express');
const app=express();
app.use(express.json());
const bodyParser=require('body-parser');
const path=require("path");
app.use(bodyParser.urlencoded({extended:false}));

// חשוב מאוד – כדי ש-req.body לא יהיה ריק:
app.use(bodyParser.json());


let db_M = require('./database');
global.db_pool = db_M.pool;

global.addSlashes    = require('slashes').addSlashes;
global.stripSlashes  = require('slashes').stripSlashes;


//מנוע רנדור שיוצר HTML 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.get('/', (req, res) => {
    res.render('index',{});
});

const courses_r = require('./routers/courses');
app.use('/courses', courses_r);
const usersRouter = require('./routers/users');
app.use("/Users", usersRouter);

app.listen(port,()=>{
console.log(`listen on port    http://localhost:${port}`);
}
)



// //npm i express body-parser ejs mysql2 slashes@2.0.0
// const port = 3015;
// const express = require('express');
// const app = express();
// app.use(express.json());

// const bodyParser = require('body-parser');
// const path = require("path");
// app.use(bodyParser.urlencoded({extended: false}));

// let db_M = require('./database');
// global.db_pool = db_M.pool;

// app.set("view engine", "ejs");
// app.set('views', path.join(__dirname, "./views"));

// global.addSlashes    = require('slashes').addSlashes;
// global.stripSlashes  = require('slashes').stripSlashes;


// const crs_R = require('./Routers/course_R');
// app.use('/Crs',crs_R);

// app.get('/', (req, res) => {
//     res.render("index", {});
// })

// app.listen(port, () => {
//     console.log(`Now listening on port http://localhost:${port}`);
// });
