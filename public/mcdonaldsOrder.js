let userChoice = 0; //Stores the users choice for the tier that was selected
let userTotal = 0; //Stores the users total for the order

$(document).ready(function () {//Loads all information required from the server when the page is refreshed
    refreshWebPage();
});

$("#Locations").click(function () {  //Takes the user to the locations webpage when selected
    window.location.href='locations.html'; 
})

$("#baseTier").click(function () {  //The base tier is identifed as 0 calls the check button and meal button functions
    userChoice = 0;
    checkButton();  
    mealButton();  
})

$("#midTier").click(function () {  //The mid tier is identifed as 1 calls the check button and meal button functions
    userChoice = 1;
    checkButton();
    mealButton();
})

$("#topTier").click(function () {  //The top tier is identifed as 2 calls the check button and meal button functions
    userChoice = 2;
    checkButton();
    mealButton();
})

//These button calls are all used to add up the price of the total order from the price listed
//These two are for the BigMac
$("#BM-sandwich").click(function () {  //The price of the BigMac sandwich only is $4.50 which is added to the users total order price
        userTotal += 4.50;
        mealButton(); //The total order amount is reported to the server
})
$("#BM-meal").click(function () {  
        userTotal += 7.75;
        console.log(userTotal);
        mealButton();
})

//These Two are for the quarter pounder
$("#QP-sandwich").click(function () {  
    userTotal += 4.50;
    mealButton();
})
$("#QP-meal").click(function () {  
    userTotal += 7;
    console.log(userTotal);
    mealButton();
})

$("#Checkout").click(function () {  //This button will be used to take the user to a checkout page in the future
    window.location.href='404notFound.html';
})

$("#homePage").click(function () {   //This button call takes the user to the websites home page
    window.location.href='index.html';
})

//Reports the orders total to the server and sents it on the webpage in a text box
function mealButton(){
    $.get("http://localhost:3000/user/usertotal/" + userTotal, function () {
            console.log("Website is reporting the users total is: " + userTotal);
    })
    console.log(userChoice);
    $("#price").text("$" + userTotal);

}

//This function is used to send what button the user has clicked for the tier
//to the server. While at the same time it delectes all other buttons that were not selected visually on the webpage. 

function checkButton(){
    $.get("http://localhost:3000/drone/" + userChoice, function () {
            console.log("Website is reporting button: " + userChoice);
    })
        if(userChoice == 0){
            $('#baseTier').removeClass('btn-secondary').addClass('btn-primary');
            $('#midTier').removeClass('btn-primary').addClass('btn-secondary');
            $('#topTier').removeClass('btn-primary').addClass('btn-secondary');
        }else if(userChoice == 1){
            $('#baseTier').removeClass('btn-primary').addClass('btn-secondary');
            $('#midTier').removeClass('btn-secondary').addClass('btn-primary');
            $('#topTier').removeClass('btn-primary').addClass('btn-secondary');
        }else if(userChoice == 2){
            $('#baseTier').removeClass('btn-primary').addClass('btn-secondary');
            $('#midTier').removeClass('btn-primary').addClass('btn-secondary');
            $('#topTier').removeClass('btn-secondary').addClass('btn-primary');
        }

}

//This function is called when the user reloads the webpage and it highlights what
//button the user had selected last (this also transfers across webpages). It also
//pulls what tier was selected from the server. 
function refreshWebPage(){
    $.get("http://localhost:3000/drone/", function (pulledUserChoice) {
        userChoice = pulledUserChoice; 
        if(pulledUserChoice == 0){
            $('#baseTier').removeClass('btn-secondary').addClass('btn-primary');
            $('#midTier').removeClass('btn-primary').addClass('btn-secondary');
            $('#topTier').removeClass('btn-primary').addClass('btn-secondary');
        }else if(pulledUserChoice == 1){
            $('#baseTier').removeClass('btn-primary').addClass('btn-secondary');
            $('#midTier').removeClass('btn-secondary').addClass('btn-primary');
            $('#topTier').removeClass('btn-primary').addClass('btn-secondary');
        }else if(pulledUserChoice == 2){
            $('#baseTier').removeClass('btn-primary').addClass('btn-secondary');
            $('#midTier').removeClass('btn-primary').addClass('btn-secondary');
            $('#topTier').removeClass('btn-secondary').addClass('btn-primary');
        }
    })
    //Pulls the orders total amount that is stored on the server and changes it to a float for caculation.
    $.get("http://localhost:3000/user/usertotal", function(orderTotal){
        userTotal = parseFloat(orderTotal); 
        $("#price").text("$" + orderTotal);
    })
    
}
