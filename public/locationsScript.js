$(document).ready(function () {
    //Stores the zipcode for the user from the cookie
    let zip = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)userZip\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
    console.log("The users zip code is: " + zip);
    if(zip === "48446"){
        $("#order1, #order2").addClass("btn-secondary"); 
    }else if(zip === '48201' || zip === '48202' || zip === '48203'){
        $("#order1, #order3").addClass("btn-secondary");
    }else if(zip === '48501' || zip === '48502' || zip === '48503'){
        $("#order2, #order3").addClass("btn-secondary");
    }

});

$("#homePage").click(function () {  //This button call takes the user to the homepage
    window.location.href='index.html';
})
$("#order1").click(function () {  //This button call takes the user to the order page
    window.location.href='order.html';
})

$("#order2").click(function () {  //This button call takes the user to the order page
    window.location.href='order.html';
})

$("#order3").click(function () {  //This button call takes the user to the order page
    window.location.href='order.html';
})


