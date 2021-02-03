const express = require('express');
const path = require('path');
const fs   = require('fs');
const { json } = require('express');
const app = express();

const PORT = 3000;

const notes = [];
let id=0;
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/notes', (req,res)=>{
    res.sendFile(path.join(__dirname, "public/views/notes.html"));
});

app.get('/api/notes', (req,res)=>{
    return res.json(notes);
});

app.post('/api/notes', (req,res)=>{
    id++
    const newNote = req.body;
    newNote.id = id; 
    notes.push(newNote);
    console.log(notes);
    fs.writeFile('./db/db.json', JSON.stringify(notes) , err=>{
        err ? 
        console.error(err) :console.log('saved to database')
    });
});

app.delete('/api/notes/:id', (req,res)=>{
    res.end("hello from delete");
});

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, "public/views/index.html"));
});


app.listen(PORT,()=>{
    console.log(`listening to Port ${PORT}`)
});