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
            var date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
            var iconcode= response.list[((i+1)*8)-1].weather[0].icon;
            var iconurl="https://openweathermap.org/img/wn/" + iconcode + ".png";
            var tempK= response.list[((i+1)*8)-1].main.temp;
            var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
            var humidity= response.list[((i+1)*8)-1].main.humidity;
        
            $("#fDate" + i).html(date);
            $("#fImg" + i).html("<img src="+iconurl+">");
            $("#fTemp" + i).html(tempF+"&#8457");
            $("#fHumidity" + i).html(humidity+"%");
        }
    })
}
