let userChoice = 0; //Stores the users button choice for the teir selection

$(document).ready(function () {
    refreshWebPage(); //Loads all information required from the server when the page is refreshed
});

$("#Locations").click(function () {  //Takes the user to the locations webpage when clicked
    window.location.href='locations.html';
})

$("#baseTier").click(function () {  //The base tier is identifed as 0
    userChoice = 0;
    checkButton();    
})
    
$("#midTier").click(function () {  //The mid tier is identifed as 1
    userChoice = 1;
    checkButton();
})

$("#topTier").click(function () {  //The top tier is identifed as 1
    userChoice = 2;
    checkButton();
})

$("#orderHere").click(function () {  //Takes the user to the order webpage when clicked 
    window.location.href='order.html';
})

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
        console.log("the user choice pulled from the server is: " + pulledUserChoice);
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
}  