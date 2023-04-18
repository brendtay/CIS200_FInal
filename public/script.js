let userChoice = 0; //Stores the users button choice for the teir selection

$(document).ready(function () {
    //name cookie
    const name = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)name\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
    console.log('Value of "name" cookie:', name);

    //Userid cookie
    const userId = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)userId\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
    console.log('Value of "userId" cookie:', userId);

    const userZip = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)userZip\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
    console.log('Value of "userZip" cookie:', userZip);
    refreshWebPage();
    $("#username").text(name);
});

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
    console.log("The value of user choice before the cookie is " + userChoice);
    userChoice = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)userChoice\s*\=\s*([^;]*).*$)|^.*$/, "$1"));   
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