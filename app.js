const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;

const notes = [];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/notes', (req,res)=>{
    res.sendFile(path.join(__dirname, "views/notes.html"));
});

app.get('/api/notes', (req,res)=>{
    return res.json(notes);
});

app.post('/api/notes', (req,res)=>{
    res.end('hello from post' )
});

app.delete('/api/notes/:id', (req,res)=>{
    res.end("hello from delete");
});

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, "views/index.html"));
});


app.listen(PORT,()=>{
    console.log(`listening to Port ${PORT}`)
});