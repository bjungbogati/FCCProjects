$(document).ready(function() {

// due to heavy API request, the required information may not display

// weather api from openweathermap.org 

  var apiId = "85eeffc710c01081b7d991a39f486d46"; 

 // user ip location from ipinfo.io/json

  $.getJSON("http://ipinfo.io/", function(location) {
    var geo = location.loc.split(","); // Longitute and Latitude
    var lat = geo[0];
    var lon = geo[1];
    var cityName = location.city;
    var country = location.country;

  // making  openweathermap api url 
  
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiId;

    // Getting weather information from openweathermap.org api

    $.getJSON(apiUrl, function(w) {
      var wId = w.weather[0].id;
      var wType = w.weather[0].main; // weather type
      var temp = w.main.temp; // temp in kelvin
      var iconId = w.weather[0].icon;
      var celsius = temp - 273.15;
      var isCelsius = true;
      var windSpeed = w.wind.speed; // wind speed
      var iconLink = "http://openweathermap.org/img/w/" + iconId + ".png";
      var imgUrl = {
        clear: "url(http://image.desk7.net/Landscape%20Wallpapers/8092_1280x800.jpg)",
        cloud: "url(http://weknowyourdreams.com/images/cloud/cloud-03.jpg)",
        storm: "url(https://lh5.ggpht.com/nt58b5SnzhsDTRzNR2zgjibuEDkiMQmPbUAWer1QBgslUssmwdYI2fVjWf1Kw3fB-TMo=h900)",
        drizzle: "url(http://www.wallpapersxl.com/wallpapers/1366x768/color-water/344710/color-water-glass-rain-drops-lights-light-macro-344710.jpg)",
        rain: "url(https://wrightouttanowhere.files.wordpress.com/2014/07/dscf4170.jpg)",
        snow: "url(https://lh3.googleusercontent.com/-ylyOtMM7QyQ/VvKT2phvSuI/AAAAAAAAXws/KYwrc7Y4QgI/w1374-h920/spring-snow-photo-joanne-beauchemin.jpg)",
        mist: "url(http://rolfgross.dreamhosters.com/Nepal-Web/1989Patan-Durbar-fog.jpg)",
      }
      var wImage = "";

      function wImg(weatherId) {
        if (weatherId >= 200 && weatherId < 300) wImage = imgUrl.storm;
        else if (weatherId >= 300 && weatherId < 400) wImage = imgUrl.drizzle;
        else if (weatherId >= 500 && weatherId < 600) wImage = imgUrl.rain;
        else if (weatherId >= 600 && weatherId < 800) wImage = imgUrl.snow;
        else if (weatherId === 800) wImage = imgUrl.clear;
        else if (weatherId > 800 && weatherId < 900) wImage = imgUrl.cloud;
        else wImage = imgUrl.mist;
      }
      wImg(wId); // call weather image function

      //now assigning weather image in background
      var cssProp = "background";
      var cssValue = wImage + "no-repeat fixed";
      $("html").css(cssProp, cssValue);
      $("html").css("background-size", "cover");
      $(".weather-info img").attr("src", iconLink);      
      $("#temp span").html(celsius.toFixed(1)  + " &#8451");
      $("#weather-type").html(wType);
      $("#wind-speed").html(windSpeed + " m/s");
      $("#location").html(cityName + ", " + country);
      $(".weather").addClass('animated zoomIn');

      function sCelsius() {
        $("#temp span").html(celsius.toFixed(1) + " &#8451");
        isCelsius = true;
      }

      function sFarenheit() {
        var f = celsius * 9 / 5 + 32;
        $("#temp span").html(Math.floor(f) + " &#8457");
        isCelsius = false;
      }
      $("#temp span").click(function() {
        (isCelsius) ? sFarenheit(): sCelsius();
      });

    });

  });

});