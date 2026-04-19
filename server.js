import express from 'express'
import dbConnection from './db.js'

import path from 'path'

const app = express()
dbConnection();
app.set('view engine', 'ejs')
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.get('/', (req, resp) => {
    const absPath = path.resolve('views/welcome.html')
    resp.sendFile(absPath)
})

app.get('/login', async(req, resp) => {
    resp.sendFile(process.cwd() + '/views/login.html')
})

app.post('/quizcategory',async(req,resp)=>{
const { name,email } = req.body;
const db =await dbConnection()
const collection = db.collection("users")
await collection.insertOne({name, email})
console.log("user login saved")
resp.sendFile(process.cwd() + '/views/mcqcategory.html')
})
app.get('/quizcategory',(req,resp)=>{
    resp.sendFile(process.cwd() + '/views/mcqcategory.html')
})

app.get('/html-quiz', (req, resp) => {
    resp.sendFile(process.cwd() + '/views/html-quiz.html')
})
app.get('/css-quiz',(req,resp)=>{
    resp.sendFile(process.cwd() + '/views/css-quiz.html')
})
app.get('/js-quiz',(req,resp)=>{
    resp.sendFile(process.cwd() + '/views/js-quiz.html')
})

app.post('/result', async(req, resp) => {
    let score = 0;
    let total = 8;
    if (req.body.q1 === 'a') score++;
    if (req.body.q2 === 'a') score++;
    if (req.body.q3 === 'a') score++;
    if (req.body.q4 === 'a') score++;
    if (req.body.q5 === 'a') score++;
    if (req.body.q6 === 'a') score++;
    if (req.body.q7 === 'a') score++;
    if (req.body.q8 === 'a') score++;
    let wrong = total - score;
    // let { name,email } = req.body;
    const db = await dbConnection();
    const collection = db.collection("results");
    await collection.insertOne({ score, total, wrong });
    console.log("score saved");
    resp.render("result",{ score, total, wrong});
//     resp.render('result', { score: score })
//     let wrong = total-score;
//     const { name, email } = req.body;
//     const db = await dbConnection();
//     const collection = db.collection("results")
//    await collection.insertOne({score, total, wrong})
// console.log("score saved")
// resp.render('result.ejs',{total, score, wrong})
});
app.listen(3400)