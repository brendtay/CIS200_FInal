const express = require("express"); //importing express
const app = express();
const cors = require('cors') //imports cors to 
const Pool = require('pg').Pool
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const e = require("cors");


const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '2014',
    port: 5432,
})

var id = 1;

var login = false;

app.get("/api/users", (req, res) => {

    pool.query('SELECT * FROM users', (error, results) => {
       
        if (error) throw error
 
        res.status(200).json(results.rows)
    })
 });

 
 app.post("/api/users/login", (req, res) => {

    console.log(req.body);

    const name = req.body.name;
    const email = req.body.email;

    // Check if name and email are not empty
    if (!name || !email) {
        res.status(400).json({ error: 'Name and email are required' });
        return;
    }

    pool.query('SELECT id, zipcode FROM users WHERE email = $1', [req.body.email], (error, results) => {
        if (error) {
            // Handle error
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Server error' });
            return;
        }

        if (results.rows.length === 0) {
            // User not found in the database
            res.json({ success: false });
        } else {
            // User found in the database
            res.json({ success: true , id: results.rows[0].id, zipCode: results.rows[0].zipcode});
        }
    });
});

 app.get("/api/users/login/status", (req, res) => { //Pulls the tier selected that is stored at /drone/ 
    res.send(login);
})

app.post("/api/users", (req, res) => {

    console.log(req.body);

    const name = req.body.name;
    const email = req.body.email;
    const zipCode = req.body.zipCode;

     // Check if name and email are not empty
    if (!name || !email) {
        res.status(400).json({ error: 'Name and email are required' });
        return;
    }

    pool.query('SELECT id FROM users WHERE email = $1', [req.body.email], (error, results) => {
        if (results.rows.length === 0) {
            // User does not exist, insert into the database
            
            const SQL = "INSERT into users (id, name, email, zipcode) VALUES (" + id + ", '" + name + "', '" + email + "', '" + zipCode + "')";
            id ++;
            pool.query(SQL, (error, results) => {
                if (error) {
                    // Handle error during insertion
                    res.status(500).json({ error: 'Failed to add user' });
                } else {
                    // User added successfully
                    res.status(200).json({ success: 'User added successfully' });
                }
            });
        } else {
            // User already exists, return 409 status code
            res.status(409).json({ error: 'User already exists' });
        }
    }); 
 })


 app.post("/api/users/total", (req, res) => {

    console.log(req.body);

    const order = req.body.order;
    const userid = req.body.userid;
    const droneTier = req.body.drone;

    console.log('Received order:', order);
    console.log('Received userid:', userid);
    console.log('Received droneTier:', droneTier);
    const sql = "UPDATE users SET orderTotal = $1, droneLevel = $2 WHERE id = $3"
    pool.query(sql, [order, droneTier, userid], (error, results) => {
        if (error) {
            // Handle error during update
            res.status(500).json({ error: 'Failed to update orderTotal' });
        } else {
            // User updated successfully
            res.status(200).json({ success: 'Order sent' });
        }
    });
 })

app.get("/user/create/id/", (req, res) => { //Returns the value stores at /usertotal/ when requested by server
    res.send(id.toString());
})


app.listen(PORT, () =>{
    console.log("Listening on port " + PORT)
})