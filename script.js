
window.onload = function () {
    var apiKey = "ed726899eb9f958e929b2de305dd6ffb"




    // tying the search form and result form to elements in HTML page
    var searchInputEl = document.querySelector('#search-input');
    var resultContentEl = document.querySelector('#result-content');
    var dashboardEl = document.querySelector('#dashboard');
    var searchFormEl = document.querySelector('#search-form');
dashboardEl.style.display = "none"

    function handleSearchFormSubmit(event) {
        event.preventDefault();
     
        var cityName = searchInputEl.value.trim();
        if (cityName) {
            dashboardEl.style.display = "block";
            getCurrentWeather(cityName);
            getWeatherForecast(cityName);
            addCitytoHistory(cityName);
            updateHistoryHTML();
            resultContentEl.textContent = '';
            searchInputEl.value = '';
        } else {
            alert('Please enter a city name');
        }


    }

function addCitytoHistory(cityName) {
    var history = JSON.parse(localStorage.getItem("history"))
    if (history) {
        history.push(cityName)
    } else {
        history = [cityName]
    }
    
    localStorage.setItem("history",JSON.stringify(history))

}
function updateHistoryHTML() {
    var history = JSON.parse(localStorage.getItem("history"))
    var historyElement = document.querySelector("#history")
    historyElement.innerHTML = '';
    for (i=0; i<history.length; i++) {
        var cityName = history[i]
        var cardEl = document.createElement('div');
        cardEl.textContent = cityName;
        historyElement.appendChild(cardEl);
    }

}

function getCurrentWeather(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);

               
                    var day = data
                    getDayWeather(day)
                    var [date, temp, wind, humidity, image] = getDayWeather(day)
                    var forecastCardEl = document.querySelector("#today")
                    var dateEl = forecastCardEl.querySelector('.date')
                    var tempEl = forecastCardEl.querySelector('.temp')
                    var windEl = forecastCardEl.querySelector('.wind')
                    var humidityEl = forecastCardEl.querySelector('.humidity')
                    var imageEl = forecastCardEl.querySelector('.icon img')
                    dateEl.textContent = cityName + " " + date
                    tempEl.textContent = temp.toFixed(2) + " F"
                    windEl.textContent = wind + " MPH"
                    humidityEl.textContent = humidity + "%"
                    imageEl.setAttribute('src', image)
                

            })
        }
    })
}
    function getDayWeather(day) {
        var dayDate = dayjs.unix(day.dt).format('MM/DD/YYYY')
        var dayTemp = (day.main.temp - 273.15) * (9 / 5) + 32
        var dayWind = day.wind.speed
        var dayHumidity = day.main.humidity
        var dayImage = "https://openweathermap.org/img/wn/"+ day.weather[0].icon.replace("n","d") + "@2x.png"
        return [dayDate, dayTemp, dayWind, dayHumidity, dayImage]
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
                        var [date, temp, wind, humidity, image] = getDayWeather(day)
                        var forecastCardEl = document.querySelector("#day" + (i + 1))
                        var dateEl = forecastCardEl.querySelector('.date')
                        var tempEl = forecastCardEl.querySelector('.temp')
                        var windEl = forecastCardEl.querySelector('.wind')
                        var humidityEl = forecastCardEl.querySelector('.humidity')
                        var imageEl = forecastCardEl.querySelector('.icon img')
                        dateEl.textContent = date
                        tempEl.textContent = temp.toFixed(2) + " F"
                        windEl.textContent = wind + " MPH"
                        humidityEl.textContent = humidity + "%"
                        imageEl.setAttribute('src', image)
                    }

                })
            }
        })
    }

    searchFormEl.addEventListener('submit', handleSearchFormSubmit)

}



