"use strict";
// https://developer.mozilla.org/fr/docs/Web/API/WindowOrWorkerGlobalScope/fetch
// https://developer.mozilla.org/fr/docs/Web/API/Body/json
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

const notificationElm = document.querySelector(".notification"),  
    iconElm = document.querySelector(".weather-icon"),
    tempElm = document.querySelector(".temperature-value p"),
    descElm = document.querySelector(".temperature-description p"),
    locationElm = document.querySelector(".location p");

// Object for getting data from API
const weather = {
    iconId: "01d",
    temperature: {
        value: "undefined", // Ex. 18
        unit: "celsius"
    },
    desc: "few clouds",
    location: {
        city: "Montreal",
        country: "CA"
    }
};


/**
 * Display data from object weather
 */
function displayWeather() {
    iconElm.innerHTML = `<img src="icons/${weather.iconId}.png">`;
    tempElm.innerHTML = `${weather.temperature.value}° <span>C</span>`;
    descElm.innerHTML = weather.desc;
    locationElm.innerHTML = `${weather.location.city}, ${weather.location.country}`;
}

tempElm.addEventListener("mousedown", () => {
    // Check unit property if it's undefined and stop the code
    if (weather.temperature.value === "undefined") return;
    
    // if temperature = celsius
    if (weather.temperature.unit === "celsius") {
        let tempFahrenheit = celsiusToFahrenheit(weather.temperature.value);
        tempFahrenheit = Math.floor(tempFahrenheit);
        
        // Display new temperature in fahrenheit
        tempElm.innerHTML = `${tempFahrenheit}° <span>F</span>`;
        
        // Set unit property with new value 
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElm.innerHTML = `${weather.temperature.value}° <span>C</span>`;
        weather.temperature.unit = "celsius";
    }
});


/**
 * Convert celsius to fahrenheit
 */
function celsiusToFahrenheit( temperature ) {
    return temperature * 9/5 + 32;
}


// Check if geolocation services is available
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition( setPosition, showError );
} else {
    notificationElm.classList.add('show');
    notificationElm.innerHTML = "Browser doesn't support geolocation!";
}

/**
 * Get user's position
 */
function setPosition( pos ) {
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;
    // console.log(pos.coords);

    // Give user's position to retrieve data about weather
    getWeather( latitude, longitude );
}


/**
 * Set an error
 */
function showError( error ) {
    notificationElm.classList.add('show');
    notificationElm.innerHTML = `${error.message}`;
}


/**
 * Get JSON from API and fetch it in Object 
 * @param {number} latitude
 * @param {number} longitude
 */
const KELVIN = 273;
const key = "3eab579f302bcc3f9583c2e143a1fc83";

function getWeather( latitude, longitude ) {
    // Get data in JSON format
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    // console.log('JSON': api);
    
    // Fetch JSON(api) in Object
    fetch(api).then(function(reponse) {
        let dataObj = reponse.json();
        return dataObj;
    }).then(function(dataObj) {
        // console.log('Object': dataObj);
        
        // Set update data in our object weather
        weather.iconId = dataObj.weather[0].icon;
        weather.temperature.value = Math.floor(dataObj.main.temp - KELVIN);
        weather.desc = dataObj.weather[0].description;
        weather.location.city = dataObj.name;
        weather.location.country = dataObj.sys.country;
    }).then(function() {
        displayWeather();
    });
}