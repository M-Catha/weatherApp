// Get weather for city
var getWeatherMyCity = function() {
	
	$("#weather").remove();
	
	// Call location API
	$.ajax({
		method: "GET",
		url: "http://ipinfo.io",
		dataType: "jsonp",
		success: function(json) {
			var userCity = json.city;
			var userRegion = json.region;
			
			// Once location has successfully returned, call weather API
			
			$.ajax({
				method: "GET",
				url: "http://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=Imperial&appid=9848226dd1b6d9694019891dd7f50ea2",
				dataType: "json",
				success:function(json) {
					if (json) {
						var tempInF = Math.round(json.main.temp);
						var weather = json.weather[0].main;
						var weatherDesc = json.weather[0].description;

						$("#header").append("<div id='weather'><div class='row'>" + userCity + ", " + userRegion + "</div>" +
												"<div class='row' id='temp'><span id='tempVal'>" + tempInF + 
												"</span> &deg;<span id='tempUnit'>F</span></div>" +
												"<div class='row'>" + weather + "</div>" + 
												"<div class='row'><i></i></div></div>");

						getWeatherImage(weatherDesc);
						$("#note").show();
						
						$("#temp").on("click", switchTemp)
					}
				}
			}); // end first API call
		}
	}); // end second API call
}

// Generate weather image/icon based on weather type
function getWeatherImage(description) {
	
	var bgString ="center center no-repeat fixed";

	var weatherBGs = {
		clear: "url('images/ClearDay.jpg')" + bgString,
		cloudy: "url('images/Cloudy.jpg')" + bgString,
		rain: "url('images/Rain.jpg')" + bgString,
		lightning: "url('images/Lightning.jpg')" + bgString,
		snow: "url('images/Snow.jpg')" + bgString,
		fog: "url('images/Foggy.jpg')" + bgString
	};

	var icons = {
		clear: "wi wi-day-sunny",
		cloudy: "wi wi-day-cloudy",
		rain: "wi wi-day-rain",
		lightning: "wi wi-day-thunderstorm",
		snow: "wi wi-day-snow",
		fog: "wi wi-day-fog"
	}

	switch(description) {
		case "clear sky":
			getBackground(weatherBGs.clear, icons.clear);
			break;
		case "overcast clouds":
		case "few clouds":
		case "scattered clouds":
		case "broken clouds":
			getBackground(weatherBGs.cloudy, icons.cloudy)
			break;
		case "shower rain":
		case "moderate rain":
		case "light rain":
		case "rain":
		case "heavy intensity rain":
			getBackground(weatherBGs.rain, icons.rain)
			break;
		case "thunderstorm":
			getBackground(weatherBGs.lightning, icons.lightning)
			break;
		case "light snow":
		case "snow":
			getBackground(weatherBGs.snow, icons.snow)
			break;
		case "mist":
			getBackground(weatherBGs.fog, icons.fog)
			break;
		default:
			break;
	}
}

// Swap between F and C
function switchTemp() {

	var tempUnit = $("#tempUnit").text();
	var tempVal = Number($("#tempVal").text());

	if (tempUnit === "F") {
		$("#tempUnit").text("C");
		tempVal = Math.round((tempVal - 32) * (5 / 9));
		$("#tempVal").text(tempVal);
	} else {
		$("#tempUnit").text("F");
		tempVal = Math.round((tempVal * (9 / 5)) + 32);
		$("#tempVal").text(tempVal);
	}
}

// Background constructor
function getBackground(url, icon) {
	$("body").css({
		"background":url,
		"background-size":"cover" 
	});
	$("i").attr("class", icon);
}

// Click functions
$("#weatherBtn").on("click", getWeatherMyCity);
