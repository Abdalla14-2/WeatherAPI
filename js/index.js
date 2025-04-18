var firstDay = document.getElementById('firstDayWeather');
var secDay = document.getElementById('secDayWeather')
var thirdDay = document.getElementById('thirdDayWeather')
var searchInput = document.getElementById('searchInput')
var country = "egypt";
var threeDaysWeather;
var finalLocationData;

async function getLocation(selectedCountry = country) {
  country = selectedCountry; 
  var locationData = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=93f2c400ff3a4fe58a8165741251704&q=${selectedCountry}&days=3`);
  finalLocationData = await locationData.json();
  threeDaysWeather = finalLocationData.forecast.forecastday;
  console.log(threeDaysWeather);
  displayFirstDay();
  displaySecDay();
  displayThirdDay();
}
getLocation()

function displayFirstDay(){
    var container = ''
    for(var i = 0 ; i<1 ; i++){
        container += `
            <div class="weather-card">
              <div class="date">
                <div>${new Date(threeDaysWeather[0].date).toLocaleDateString('en-US', { weekday: 'long' })}</div>
                <div>${threeDaysWeather[0].date}</div>
              </div>
              <div class="mt-3 mb-1">${finalLocationData.location.name},${finalLocationData.location.country}</div>
              <div class="temp">${threeDaysWeather[0].day.avgtemp_c}ºC</div>
              <div class="my-2">
                <img src="https:${threeDaysWeather[0].day.condition.icon}" class="weather-icon" alt="${threeDaysWeather[0].day.condition.text}" />
              </div>
              <div class="info">${threeDaysWeather[0].day.condition.text}</div>
              <div class="details mt-3">
                <div><img src="" />uv: ${threeDaysWeather[0].day.uv}</div>
                <div><img src="" /> ${threeDaysWeather[0].day.maxwind_kph}km/h</div>
                <div><img src="" /> sunrise: ${threeDaysWeather[0].astro.sunrise}</div>
              </div>
            </div>
        `
    }
    firstDay.innerHTML = container;
}

function displaySecDay(){
  var container = ''
  for(var i = 0 ; i<1 ; i++){
      container += `
            <div class="weather-card">
              <div class="date d-flex justify-content-center">
                <div>${new Date(threeDaysWeather[1].date).toLocaleDateString('en-US', { weekday: 'long' })}</div>
              </div>
              <div class="mt-2 d-flex justify-content-center">
                <img src="https:${threeDaysWeather[1].day.condition.icon}" alt="${threeDaysWeather[1].day.condition.text}">
              </div>
              <div class="temp fs-4 fw-medium text-center mt-3">${threeDaysWeather[1].day.maxtemp_c}ºC</div>
              <div class="temp fs-6 fw-light text-center">${threeDaysWeather[1].day.mintemp_c}ºC</div>
              <div class="info text-center mt-3">${threeDaysWeather[1].day.condition.text}</div>
            </div>
      `
  }
  secDay.innerHTML = container;
}

function displayThirdDay(){
  var container = ''
  for(var i = 0 ; i<1 ; i++){
      container += `
            <div class="weather-card">
              <div class="date d-flex justify-content-center">
                <div>${new Date(threeDaysWeather[2].date).toLocaleDateString('en-US', { weekday: 'long' })}</div>
              </div>
              <div class="mt-2 d-flex justify-content-center">
                <img src="https:${threeDaysWeather[2].day.condition.icon}" alt="${threeDaysWeather[2].day.condition.text}">
              </div>
              <div class="temp fs-4 fw-medium text-center mt-3">${threeDaysWeather[2].day.maxtemp_c}ºC</div>
              <div class="temp fs-6 fw-light text-center">${threeDaysWeather[2].day.mintemp_c}ºC</div>
              <div class="info text-center mt-3">${threeDaysWeather[2].day.condition.text}</div>
            </div>
      `
  }
  thirdDay.innerHTML = container;
}

function searchCountry(country){

}

searchInput.addEventListener('input', function () {
  const value = searchInput.value.trim();
  getLocation(value);
});

navigator.geolocation.getCurrentPosition(
  async function (position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var coords = `${lat},${lon}`;
    await getLocation(coords);
  }
)