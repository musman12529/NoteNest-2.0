


import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app= express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON requests


const db= mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database:'notereact'
});

app.get('/', (req, res) => {
    return res.send("Hello World");
});

app.post('/addNote', (req, res) => {
    const { title, content,id } = req.body;
    const query = 'INSERT INTO users2 (title, content, id) VALUES (?, ?,?)';
    db.query(query, [title, content,id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to add note to the database.' });
      } else {
        console.log('Note added to the database successfully.');
        return res.status(200).json({ success: true, id: result.insertId });
        //return res.status(200).json({ success: true });
      }
    });
  });
  
  app.delete('/deleteNote/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM users2 WHERE id = ?';
    db.query(query, id, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to delete note from the database.' });
      } else {
        console.log('Note deleted from the database successfully.');
        return res.status(200).json({ success: true });
      }
    });
  });
  
  // Adjust the route to fetch notes from MySQL
  app.get('/getNotes', (req, res) => {
    db.query('SELECT * FROM users2', (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to fetch notes from the database.' });
      } else {
        console.log("Notes fetched successfully from the database.");
        return res.status(200).json(result);
      }
    });
  });

// app.get('/users2', (req, res) => {
//     db.query('SELECT * FROM users2', (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("working");
//             return res.send(result);
            
//         }
//     });
// });

app.listen(8081, () => {
    console.log("Server is running on port 8081");
});