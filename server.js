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
// Middleware for parsing cookies
app.use(cookieParser());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '2014',
    port: 5432,
})



var tierSelected = 0; //Stores the tier that the user selected
var userOrderTotal = 0; //Stores the total value of the order in a float
var orderStorage = 0; //Stores the total value of the order in a string to return to the website

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

    pool.query('SELECT id FROM users WHERE email = $1', [req.body.email], (error, results) => {
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
            res.json({ success: true });
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
    

     // Check if name and email are not empty
    if (!name || !email) {
        res.status(400).json({ error: 'Name and email are required' });
        return;
    }

    pool.query('SELECT id FROM users WHERE email = $1', [req.body.email], (error, results) => {
        if (results.rows.length === 0) {
            // User does not exist, insert into the database
            
            const SQL = "INSERT into users (id, name, email) VALUES (" + id + ", '" + name + "', '" + email + "')";
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

 app.post("/api/users", (req, res) => {

    console.log(req.body);

    const name = req.body.name;
    const email = req.body.email;
    

     // Check if name and email are not empty
    if (!name || !email) {
        res.status(400).json({ error: 'Name and email are required' });
        return;
    }

    pool.query('SELECT id FROM users WHERE email = $1', [req.body.email], (error, results) => {
        if (results.rows.length === 0) {
            // User does not exist, insert into the database
            
            const SQL = "INSERT into users (id, name, email) VALUES (" + id + ", '" + name + "', '" + email + "')";
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
 
 app.get('/', (req, res) => {
    // Send the HTML template to the client
    res.sendFile(__dirname + '/public/index.html');
  });

app.get("/drone/:tier", (req, res) => { //pulls the tier selected fromm the website
    tierSelected =  req.params.tier; //looking back this might be pointless but it sends it back to the website
    //console.log("Server is storing button: " + tierSelected);
    
})

app.get("/drone/", (req, res) => { //Pulls the tier selected that is stored at /drone/ 
    res.send(tierSelected);

    
})


app.get("/user/usertotal/:total", (req, res) => {
        userOrderTotal = parseFloat(req.params.total); //Stores the users order total on the server as a float
        orderStorage = req.params.total; //Stores the same value as a string to return to the webpage on request
        res.send(JSON.stringify(userOrderTotal)); //I dont know why this works but it just does string --> float --> string
    
        //console.log("Server is users order total of: " + userOrderTotal);
    
})

app.get("/user/usertotal/", (req, res) => { //Returns the value stores at /usertotal/ when requested by server
    res.send(orderStorage);
})


app.listen(PORT, () =>{
    console.log("Listening on port " + PORT)
})

