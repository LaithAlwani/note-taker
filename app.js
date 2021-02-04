const express = require('express');
const path = require('path');
const fs   = require('fs');
const { nextTick } = require('process');
// const { json } = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
let notes = [];

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/notes', (req,res)=>{
    res.sendFile(path.join(__dirname, "public/views/notes.html"));
    
});

app.get('/api/notes', (req,res)=>{
    fs.readFile(__dirname + '/db/db.json', 'utf8', function (err, data) {
        if (err) throw err;
        data = JSON.parse(data);
        notes = data;   
        res.json(data);
    });
});

app.post('/api/notes', (req,res)=>{
    const id = getNextId();
    const newNote = req.body;
    newNote.id = id; 
    notes.push(newNote);
    // saveData();
    res.end();
});

function getNextId(){
    let id = 1;
    notes.forEach(note =>{
        if(note.id > id){
            id = note.id + 1;
        }else{
            id +=1;
        }  
    });
    return id;
}

app.delete('/api/notes/:id', (req,res)=>{
    const id = parseInt(req.params.id);
    notes.forEach((note, index) =>{
        if(note.id === id){
            notes.splice(index, 1);
            saveData();   
        }
    })
    res.end();
});

function saveData() {
    fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
        err ?
            console.error(err) : console.log('saved to database');
    });
}

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, "public/views/index.html"));
});


app.listen(PORT,()=>{
    console.log(`listening to Port ${PORT}`)
});


