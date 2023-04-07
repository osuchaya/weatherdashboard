window.onload = function() {
var apiKey = "ed726899eb9f958e929b2de305dd6ffb"
fetch("https://api.openweathermap.org/data/2.5/forecast?lat=19.4326&lon=99.1332&appid=" + apiKey)
.then(function(response) {
console.log("response",response)
})



}