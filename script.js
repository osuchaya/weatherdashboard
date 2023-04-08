
window.onload = function () {
    var apiKey = "ed726899eb9f958e929b2de305dd6ffb"

    

   
    // tying the search form and result form to elements in HTML page
    var searchFormEl = document.querySelector('#search-form');
    var resultContentEl = document.querySelector('#result-content');
    var resultTextEl = document.querySelector('#result-text');

    function handleSearchFormSubmit(event) {
        event.preventDefault();
  //      if (!searchInputVal) {
  //          console.error('You need a search input value!');

  //      }
        fetch("https://api.openweathermap.org/data/2.5/forecast?lat=19.4326&lon=99.1332&appid=" + apiKey)
        .then(function (response) {
            console.log("response", response)
            return response.json();
        }) .then(function (data){
            console.log(data)
        })
    }

    // search query and format values:
    searchFormEl.addEventListener('submit', handleSearchFormSubmit);
}