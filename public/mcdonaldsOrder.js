let userChoice = 0; //Stores the users choice for the tier that was selected
let userTotal = 0; //Stores the users total for the order
let id = 0;
let ordertotal = userTotal;
$(document).ready(function () {//Loads all information required from the server when the page is refreshed
    refreshWebPage();
    //stores id to a cookie
    id = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)userId\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
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
    
    const data = {
        order: userTotal,
        userid: id,
        drone: userChoice
    }

    $.post("/api/users/total", data, function(response){
        console.log("Server response:", response); 
        //If the server responds back with successful that means the server has confirmed the order
        if(response.success){
            $("#Checkout").text("Order has been placed!");
        }else{
            $("#Checkout").text("Order has not been placed!");
        }
    }).fail(function(xhr, textStatus, errorThrown) {
        console.error("Error:", textStatus);
        // Handle error here, e.g. display an error message to the user
    });
})

$("#homePage").click(function () {   //This button call takes the user to the websites home page
    window.location.href='index.html';
})

$("#ResetOrder").click(function() { //Resets the users total order to 0
    userTotal = 0;
    mealButton();
    console.log("The order has been reset");
    $("#Checkout").text("Place Order");


})

//Stores the users order total on a cookie and uppdates the button
function mealButton(){

    document.cookie = "usertotal=" + userTotal + "; expires=" + new Date(Date.now() + 86400000).toUTCString() + "; path=/";

    console.log(userChoice);
    $("#price").text("$" + userTotal.toFixed(2));
}

//This function is used to send what button the user has clicked for the tier
//to the server. While at the same time it delectes all other buttons that were not selected visually on the webpage. 
function checkButton(){
    document.cookie = "userChoice=" + userChoice + "; expires=" + new Date(Date.now() + 86400000).toUTCString() + "; path=/";
    console.log('Value of "userChoice" cookie:', userChoice);

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
    userChoice = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)userChoice\s*\=\s*([^;]*).*$)|^.*$/, "$1"));

    console.log("The value of user choice is: " + userChoice);
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

    //Pulls the orders total amount that is stored on the cookie and changes it to a float for caculation.
    userTotal = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)usertotal\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
    userTotal = parseFloat(userTotal); 
    $("#price").text("$" + userTotal.toFixed(2)); 
}