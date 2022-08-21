var colours =['#f78900','#897345','#901747'];
var random_color=colours[Math.floor(Math.random()*colours.length)];
document.getElementById('body').style.background=random_color;
var colos =['#063701','#74729','#711247','#678333','#234','#456'];
var rand_color=colos[Math.floor(Math.random()*colos.length)];
document.getElementById('button').style.background=rand_color;
var font =['50px','40px','30px'];
document.getElementById('button').style.fontSize=font[Math.floor(Math.random()*font.length)];

const button = document.querySelector("button");

button.addEventListener("click", ()=>{
    if(navigator.geolocation){
        button.innerText = "Allow to detect location";
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        button.innerText = "Your browser not support";
    }
});

function onSuccess(position){
    button.innerText = "Detecting your location...";
    let {latitude, longitude} = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`)
    .then(response => response.json()).then(response =>{
        let allDetails = response.results[0].components;
        console.table(allDetails);
        let {county, postcode, country} = allDetails;
        button.innerText = `${county} ${postcode}, ${country}`;
    }).catch(()=>{
        button.innerText = "Something went wrong";
    });
}

function onError(error){
    if(error.code == 1){
        button.innerText = "You denied the request";
    }else if(error.code == 2){
        button.innerText = "Location is unavailable";
    }else{
        button.innerText = "Something went wrong";
    }
    button.setAttribute("disabled", "true");
}

