import express from 'express'
import dbConnection from './db.js'

import path from 'path'
import { ObjectId } from 'mongodb';

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
const { name,email,role } = req.body;
const db =await dbConnection()
const collection = db.collection("users")
await collection.insertOne({name, email, role})
console.log(name, email, role)
if(role === "student"){
  resp.sendFile(process.cwd() + "/views/mcqcategory.html")
}else if(role === "teacher"){
  resp.redirect("/teacher-dashboard")
}else if(role === "examiner"){
  resp.redirect("/examiner-dashboard")
}
})

app.get('/teacher-dashboard',async(req,resp)=>{
    const db =await dbConnection();
    const collection = db.collection("results")
    const results =await collection.find().toArray();
    resp.render('teacher-dashboard', {results})
})

app.post('/save-question',async(req,resp)=>{
    const db = await dbConnection();
    const collection = db.collection('savequestion')
    const result = await collection.insertOne(req.body)
    // resp.render('save-question', {result})
    console.log(result)
    resp.render('save-question',{result})
})

app.get('/view-question',async(req,resp)=>{
    const db =await dbConnection();
    const collection = db.collection('savequestion')
    const results = await collection.find().toArray();
    resp.render('view-question', {results})
})

app.post('/delete-question/:id',async(req,resp)=>{
    const db =await dbConnection();
    const collection = db.collection('savequestion')
    const results = await collection.deleteOne({_id: new ObjectId(req.params.id)});
    console.log("question deleted")
    resp.redirect('/view-question')
})

app.get('/quizcategory',(req,resp)=>{
    resp.sendFile(process.cwd() + '/views/mcqcategory.html')
})

app.get('/html-quiz', (req, resp) => {
    resp.sendFile(process.cwd() + '/views/html-quiz.html')
})
app.get('/coa-quiz',(req,resp)=>{
    resp.sendFile(process.cwd() + '/views/coa-quiz.html')
})
app.get('/dbms-quiz',(req,resp)=>{
    resp.sendFile(process.cwd() + '/views/dbms-quiz.html')
})
app.get('/ns-quiz',(req,resp)=>{
    resp.sendFile(process.cwd() + '/views/ns-quiz.html')
})
app.get('/sad-quiz',(req,resp)=>{
    resp.sendFile(process.cwd() + '/views/sad-quiz.html')
})
app.get('/examiner-dashboard',(req,resp)=>{
    resp.render('examiner-dashboard')
})

app.get('/add-question',(req,resp)=>{
    resp.render('add-question')
})

app.get('/view-question',(req,resp)=>{
    resp.render('view-question')
})

app.get('/delete-question',(req,resp)=>{
    resp.render('delete-question')
})

app.post('/result', async(req, resp) => {
    let score = 0;
    let total = 20;
    if (req.body.q1 === 'a') score++;
    if (req.body.q2 === 'a') score++;
    if (req.body.q3 === 'a') score++;
    if (req.body.q4 === 'a') score++;
    if (req.body.q5 === 'a') score++;
    if (req.body.q6 === 'a') score++;
    if (req.body.q7 === 'a') score++;
    if (req.body.q8 === 'a') score++;
    if (req.body.q9 === 'a') score++;
    if (req.body.q10 === 'a') score++;
    if (req.body.q11 === 'a') score++;
    if (req.body.q12 === 'a') score++;
    if (req.body.q13 === 'a') score++;
    if (req.body.q14 === 'a') score++;
    if (req.body.q15 === 'a') score++;
    if (req.body.q16 === 'a') score++;
    if (req.body.q17 === 'a') score++;
    if (req.body.q18 === 'a') score++;
    if (req.body.q19 === 'a') score++;
    if (req.body.q20 === 'a') score++;
    let wrong = total - score;
    let date = new Date().toLocaleDateString();
    let status = score >= 10 ? "Pass" : "Fail";
    let { name,email,subject } = req.body;
    const db = await dbConnection();
    const collection = db.collection("results");
    await collection.insertOne({date, name, email, subject, total, score, wrong, status });
    console.log(req.body)
    resp.render("result",{ score, total, wrong});

});
app.listen(3400)