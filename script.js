// my apikey
var apikey = "46284fce87c7f71033bf8fc8bd177bd1";

// 
var inputEl = document.querySelector(".input");

// stores city name in local storage
var cityName = localStorage.getItem("citynameContent");

// current day weather url
var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apikey;
// five day weather url
var forcastWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&APPID=" + apikey;

// 
function recordCityName () {
    localStorage.setItem("citynameContent", inputEl.vaule);
}

for (var i = 0; 1 < localStorage.length; i++) {
    $()
}