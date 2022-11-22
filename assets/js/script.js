// variables for current weather section
var city = "";
var cityList = $(".city-list");
var searchCity = $("#search-city");
var currentCity = $("#current-city");
var currentTemp = $("#temperature");
var currentHumidity = $("#humidity");
var currentWind = $("#wind");
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
// current weather forecast
function currentWeather(city){
    // link for current weather
    var WeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey;
    $.ajax({
        url: WeatherURL,
        method: "GET"
    }).then(function (response) {
        var weatherIcon = response.weather[0].icon;
        var iconPath = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";

        var date = new Date(response.dt*1000).toLocaleDateString();
        $(currentCity).html(response.name +"("+date+")" + "<img src="+iconPath+">");

        var temp = (response.main.temp - 273.15) * 1.80 +32;
        $(currentTemp).html((temp).toFixed(2)+"&#8457");
        $(currentHumidity).html(response.main.humidity+"%");

        var windSpeed = response.wind.speed;
        var windMPH = (windSpeed*2.237).toFixed(1);
        $(currentWind).html(windMPH + "MPH");

        forecast(response.id);
        if(response.cod==200){
            cityArray = JSON.parse(localStorage.getItem("cityname"));
            console.log(cityArray);
            if (cityArray == null){
                cityArray=[];
                cityArray.push(city.toUpperCase()
                );
                localStorage.setItem("cityname",JSON.stringify(cityArray));
                addToList(city);
            }
            else {
                if (find(city)> 0){
                    cityArray.push(city.toUpperCase());
                    localStorage.setItem("cityname",JSON.stringify(cityArray));
                    addToList(city);
                }
            }
        }
    });
}
// future weather forecast
function forecast(cityid){
    var dayover = false;
    // link for future forecast
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityid + "&appid=" + apikey;

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(response){
        for (i = 0; i < 5; i++){
            var date = new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
            var iconcode = response.list[((i+1)*8)-1].weather[0].icon;
            var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
            var tempK = response.list[((i+1)*8)-1].main.temp;
            var tempF = (((tempK-273.5)*1.80)+32).toFixed(2);
            var humidity = response.list[((i+1)*8)-1].main.humidity;
            var windS = response.list[((i+1)*8)-1].wind.speed;
            var windF = ((windS*2.237).toFixed(1));
        
            $("#fDate" + i).html(date);
            $("#fImg" + i).html("<img src="+iconurl+">");
            $("#fTemp" + i).html(tempF+"&#8457");
            $("#fHumidity" + i).html(humidity+"%");
            $("#fWind" + i).html(windF+"MPH");
        }
    })
}
// creates a clickable list of every state entered into local storage
function addToList(data){
    var listEl= $("<li>"+data.toUpperCase()+"</li>");
    $(listEl).attr("class","list-group-item");
    $(listEl).attr("data-value", data.toUpperCase());
    $(".city-list").append(listEl);
}
// displays a previously typed search result on click
function PastSearch(weatherEvent){
    var liEl = weatherEvent.target;
    if (weatherEvent.target.matches("li")){
        city = liEl.textContent.trim();
        currentWeather(city);
    }
}
// 
function loadlastCity(){
    $("ul").empty();
    var cityArray = JSON.parse(localStorage.getItem("cityname"));
    if (cityArray !== null){
        cityArray = JSON.parse(localStorage.getItem("cityname"));
        for(i = 0; i < cityArray.length; i++){
            addToList(cityArray[i]);
        }
        city = cityArray[i-1];
        currentWeather(city);
    }
}
//Click Handlers
$("#search-button").on("click",Weather);
$(document).on("click",PastSearch);
$(window).on("load",loadlastCity);