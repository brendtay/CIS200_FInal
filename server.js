const express = require("express"); //importing express
const app = express();
const cors = require('cors') //imports cors to 

const PORT = process.env.PORT || 3000;

app.use(cors())

app.listen(PORT, () =>{
    console.log("Listening on port " + PORT)
})

var tierSelected = 0; //Stores the tier that the user selected
var userOrderTotal = 0; //Stores the total value of the order in a float
var orderStorage = 0; //Stores the total value of the order in a string to return to the website

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
