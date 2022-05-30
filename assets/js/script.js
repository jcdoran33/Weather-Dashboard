console.log("Javascript is linked!")
// GLOBAL VARIABLE DECLARATION
// search field
var searchTextField = document.getElementById("search-input");
//search button
var searchButton = document.getElementById("search-button");
//searched-for city display
var chosenCity = document.getElementById("chosen-city-name");
//declare the userSearch var without value (so it can be referenced by multiple fucntions)
var userSearch;

var weatherApiKey = "ccd6639ee8a0a85c2ab586d91cfb5a8a";

var googleMapsGeocodeApiLink = "https://maps.googleapis.com/maps/api/geocode/json?address="

// need to reference two apis, the one call weather api, AND
// another apis that will go fetch a city's lat and lon based on a text city name
//maybe google maps api?


// create an IF conditional statement, that will apply an accurate weather icon based on weather criteria, in the 5 day forecast

function runSearch () {
    console.log("runSearch function launched")
    var userSearch = searchTextField.value;
    console.log(userSearch);
    console.log(typeof userSearch); // returns a string
    //update the displayed city name
    // $(chosenCity).text("Weather for " + userSearch); -- commented this out to move to update display function, reactivate if you combine
    //fetch weather from API and display in the display area
    geocodeConversion();
    updateDisplay();
}

//function that converts the inputted city state name to latitude and longitude coordinates
//may need to come back and remove the , from the user search input. Can check if there are issues with API
function geocodeConversion () {
    var userSearch = searchTextField.value
        console.log("geocodeConversion function launched");
    var locationUrlString = userSearch.replace(" ","%20");
        // splitUrlString.relpace(",","");
        console.log(locationUrlString)
    //now concatenate the url sting on to the end of the google maps API URL
    var completeUrlString = "https://maps.googleapis.com/maps/api/geocode/json?address=" + locationUrlString+ "&key=AIzaSyBjwEk24WO-R9Ad8hxTNUM4BvsIzH8fQDw"    
    console.log(completeUrlString);

    fetch(completeUrlString)
        .then(function (response){
                console.log(response);
                response.json().then(function(data) {
            console.log(data);
            var latitude = data.results[0].geometry.location.lat;
            var longitude = data.results[0].geometry.location.lng;
            console.log(latitude);
            console.log(longitude);
        //testing if it will work nested        
        var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + weatherApiKey;
            console.log(weatherApiUrl);
            fetch(weatherApiKey)
                .then(function (response){
                    response.json().then(function(data) {
                        console.log(data);
                        var temperature = data.current.temp;
                        var windSpeed = data.current.wind_speed;
                        var humidity = data.current.humidity;
                        var uvIndex = data.durrent.uvi;
                        console.log(temperature);

                    })
                })
       
       
            })
})
    // apiFetch();
    //have to do this within this function since, lat anf long variables are local
   


}

//function that fetches data from API based on latitude and longitude
function apiFetch () {
    console.log("apiFetch function launched");
    //create a new URL to feed to Open Weather API, absed on lat and longitude
    console.log(latitude);
}

//maybe combine these all into one? or at least two of them
//function that handles updating the display with the data fetched from weather api
function updateDisplay () {
    var userSearch = searchTextField.value;
    $(chosenCity).text("Weather for " + userSearch);
        console.log(userSearch);
}

$("#search-button").click(runSearch);