
window.onload = function () {
    var apiKey = "ed726899eb9f958e929b2de305dd6ffb"




    // tying the search form and result form to elements in HTML page
    var searchInputEl = document.querySelector('#search-input');
    var resultContentEl = document.querySelector('#result-content');
    var resultTextEl = document.querySelector('#result-text');
    var searchFormEl = document.querySelector('#search-form');

    function handleSearchFormSubmit(event) {
        event.preventDefault();
        //      if (!searchInputVal) {
        //          console.error('You need a search input value!');

        //      }
        var cityName = searchInputEl.value.trim();
        if (cityName) {
            getWeatherForecast(cityName);
            resultContentEl.textContent = '';
            searchInputEl.value = '';
        } else {
            alert('Please enter a city name');
        }


    }



    function getDayWeather(day) {
        var dayDate = day.dt_txt.substring(0, 11)
        var dayTemp = (day.main.temp - 273.15) * (9 / 5) + 32
        var dayWind = day.wind.speed
        var dayHumidity = day.main.humidity
        return [dayDate, dayTemp, dayWind, dayHumidity]
    }
    var getWeatherForecast = function (cityName) {
        var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey

        fetch(apiUrl).then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);

                    for (i = 0; i < 5; i++) {
                        var day = data.list[i * 8 + 4]
                        getDayWeather(day)
                        var [date, temp, wind, humidity] = getDayWeather(day)
                        var forecastCardEl = document.querySelector("#day" + (i + 1))
                        var dateEl = forecastCardEl.querySelector('.date')
                        var tempEl = forecastCardEl.querySelector('.temp')
                        var windEl = forecastCardEl.querySelector('.wind')
                        var humidityEl = forecastCardEl.querySelector('.humidity')
                        dateEl.textContent = date
                        tempEl.textContent = temp.toFixed(2) + " F"
                        windEl.textContent = wind + " MPH"
                        humidityEl.textContent = humidity + "%"

                    }



                })
            }
        })
    }

    searchFormEl.addEventListener('submit', handleSearchFormSubmit)

}



