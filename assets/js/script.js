console.log("Javascript is linked!")
// GLOBAL VARIABLE DECLARATION
// search field
var searchTextField = document.getElementById("search-input");
//search button
var searchButton = document.getElementById("search-button");
//searched-for city display
var chosenCity = document.getElementById("chosen-city-name");
//declare the userSearch var 
var userSearch;
//open weather api key
var weatherApiKey = "ccd6639ee8a0a85c2ab586d91cfb5a8a";
//google maps api key
var googleMapsGeocodeApiLink = "https://maps.googleapis.com/maps/api/geocode/json?address=";
//today's date
var todaysDate = moment().format("MM/DD/YY");

//function run when search button is clicked - launches other functions
function runSearch() {
    //IF search is not empty update displayed city name, then launch main functions
    if (searchTextField.value) {
        var userSearch = searchTextField.value;
        // console.log(typeof userSearch); // returns a string
        geocodeConversion();
        updateDisplay();
    } else {
        console.log("Error: No search input")
    }
};


//function that converts the inputted city state name to latitude and longitude coordinates, then updates the current and 5day weather
function geocodeConversion() {
    var userSearch = searchTextField.value
    // console.log("geocodeConversion function launched");
    var locationUrlString = userSearch.replace(" ", "%20"); // converts the search input into string that can be passed into URL (replaces space with %20)
    //now concatenate the url sting on to the end of the google maps API URL
    var completeUrlString = "https://maps.googleapis.com/maps/api/geocode/json?address=" + locationUrlString + "&key=AIzaSyBjwEk24WO-R9Ad8hxTNUM4BvsIzH8fQDw"
    // console.log(completeUrlString);
    //fetch the api data
    fetch(completeUrlString)
        .then(function (response) {
            response.json()
                .then(function (data) {
                    // console.log(data);
                    var latitude = data.results[0].geometry.location.lat;
                    var longitude = data.results[0].geometry.location.lng;
                    console.log(latitude);
                    console.log(longitude);
                    //testing if it will work nested        
                    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + weatherApiKey;
                    console.log(weatherApiUrl);
                    fetch(weatherApiUrl)
                        .then(function (response) {
                            response.json().then(function (data) {
                                // console.log(data);
                                var temperature = data.current.temp;
                                var windSpeed = data.current.wind_speed;
                                var humidity = data.current.humidity;
                                var uvIndex = data.current.uvi;
                                console.log(temperature);
                                console.log(windSpeed);
                                console.log(humidity);
                                console.log(uvIndex);
                                // now update the display with variable amounts returned form API
                                $("#temp").text("Temperature: " + temperature + "F");
                                $("#wind").text("Wind: " + windSpeed + "mph");
                                $("#humidity").text("Humidity: " + humidity + "%");
                                $("#uv-index").text("UV Index: " + uvIndex);
                                // add if condition to color code UV Index 
                                if (uvIndex <= 3) {
                                    $("#uv-index").css("background-color", "green")
                                } else if (uvIndex <= 7) {
                                    $("#uv-index").css("background-color", "yellow")
                                } else {
                                    $("#uv-index").css("background-color", "red")
                                };
                                // create URL for weather icon
                                var weatherIconUrl = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png";
                                // console.log(weatherIconUrl);
                                //then update the img placeholder
                                $("#weather-icon").css("display", "inline");
                                $("#weather-icon").attr("src", weatherIconUrl);
                                //update the 5 day forecast...
                                var day0Date = moment().format("MM/DD/YY")
                                var day1Date = moment().add(1, "d").format("MM/DD/YY");
                                var day2Date = moment().add(2, "d").format("MM/DD/YY");
                                var day3Date = moment().add(3, "d").format("MM/DD/YY");
                                var day4Date = moment().add(4, "d").format("MM/DD/YY");
                                //day 0
                                $("#day-0-date").text(day0Date);
                                $("#day-0-icon").css("display", "inline");
                                $("#day-0-icon").attr("src", "http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + ".png")
                                $("#day-0-temp").text("Temp: " + data.daily[0].temp.day + "F");
                                $("#day-0-wind").text("Wind: " + data.daily[0].wind_speed + "mph");
                                $("#day-0-hum").text("Humidity: " + data.daily[0].humidity + "%");
                                //day 1
                                $("#day-1-date").text(day1Date);
                                $("#day-1-icon").css("display", "inline");
                                $("#day-1-icon").attr("src", "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + ".png")
                                $("#day-1-temp").text("Temp: " + data.daily[1].temp.day + "F");
                                $("#day-1-wind").text("Wind: " + data.daily[1].wind_speed + "mph");
                                $("#day-1-hum").text("Humidity: " + data.daily[1].humidity + "%");
                                //day 2
                                $("#day-2-date").text(day2Date);
                                $("#day-2-icon").css("display", "inline");
                                $("#day-2-icon").attr("src", "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + ".png")
                                $("#day-2-temp").text("Temp: " + data.daily[2].temp.day + "F");
                                $("#day-2-wind").text("Wind: " + data.daily[2].wind_speed + "mph");
                                $("#day-2-hum").text("Humidity: " + data.daily[2].humidity + "%");
                                //day 3
                                $("#day-3-date").text(day3Date);
                                $("#day-3-icon").css("display", "inline");
                                $("#day-3-icon").attr("src", "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + ".png")
                                $("#day-3-temp").text("Temp: " + data.daily[3].temp.day + "F");
                                $("#day-3-wind").text("Wind: " + data.daily[3].wind_speed + "mph");
                                $("#day-3-hum").text("Humidity: " + data.daily[3].humidity + "%");
                                //day 4
                                $("#day-4-date").text(day4Date);
                                $("#day-4-icon").css("display", "inline");
                                $("#day-4-icon").attr("src", "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + ".png")
                                $("#day-4-temp").text("Temp: " + data.daily[4].temp.day + "F");
                                $("#day-4-wind").text("Wind: " + data.daily[4].wind_speed + "mph");
                                $("#day-4-hum").text("Humidity: " + data.daily[4].humidity + "%");

                            })
                        })


                })
        })
};


//function that handles updating the display with the data fetched from weather api, and sets the search into local storage
function updateDisplay() {
    var userSearch = searchTextField.value;
    $(chosenCity).text("Weather for " + userSearch + " on " + todaysDate);

    // process that saves search to local storage
    //add user search to array
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    console.log("Search History: " + searchHistory)
    searchHistory.push(userSearch);
    //saves new search history array to local storage
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    //add process that appends a button to the sidebar
    $("#sidebar").append('<button type="button" class="btn btn-secondary container-fluid m-1" id="' + userSearch + '">' + userSearch + '</button>');
};

// separate function that will launch page with anything in storage (for loop thru storage)
function updateHistory() {
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    //add process that appends a button to the sidebar
    for (var i = 0; i < searchHistory.length; i++) {
        $("#sidebar").append('<button type="button" class="btn btn-secondary container-fluid m-1" id="' + searchHistory[i] + '">' + searchHistory[i] + '</button>');
    }

};

// run updateHistory on page loading
updateHistory();

//event listener for a click on any of the historical searches in the sidebar, take the text value of that tag and run the runSearch program with it
$(document).ready(
    //need to fix this ID - maybe make a div container for all the search histories?
    $("#sidebar").click(function (event) {
        //saves the clicked button's ID as a variable valueClicked
        var valueClicked = event.target.id;
        // console.log(valueClicked)
        //fills the search field with the contents of the clicked button - IF what was clicked on was a search history button
        if (valueClicked !== "search-area" && valueClicked !== "search-input" && valueClicked !== "search-button" && valueClicked !== "sidebar") {
            searchTextField.value = event.target.id
            //launch runSearch again
            runSearch();
        };
    })
);
//click listener for search button
$("#search-button").click(runSearch);