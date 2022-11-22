// variables for current weather section
var city = "";
var cityList = $(".city-list");
var searchCity = $("#search-city");
var currentCity = $("#current-city");
var currentTemp = $("#temperature");
var currentHumidity = $("#humidity");
var currentWind = $("wind");
var cityArray = [];
// searches for the city typed in
function find(data){
    for (var i = 0; i < cityArray.length; i++){
        if(data.toUpperCase() === cityArray[i]){
            return -1;
        };
    };
    return 1;
};
// my api key
var apikey = "1d3c67d57918d41bff260c0115e9886c";
// displays the city that was searched
function Weather(weatherEvent){
    weatherEvent.preventDefault();
    if (searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        currentWeather(city);
    };
};
// current weather 
function currentWeather(city){
    // link for current weather
    var cWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey;
    $.ajax({
        url: cWeatherURL,
        method: "GET",
    }).then(function (response) {
        var weatherIcon = response.weather[0].icon;
        var iconPath = "api.openweathermap.org/img/wn/"+ weatherIcon +"@2x.png";

        var date=new Date(response.dt*1000).toLocaleDateString();
        $(currentCity).html(response.name +"("+date+")" + "<img src="+iconPath+">");

        var temp = (response.main.temp - 273.15) * 1.80 +32;
        $(currentTemp).html((temp).toFixed(2)+"&#8457");
        $(currentHumidity).html(response.main.humidity+"%");

        var windSpeed = response.wind.speed;
        var windMPH = (windSpeed*2.237).toFixed(1);
        $(currentWind).html(windMPH + "MPH");
    });
}