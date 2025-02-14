document.getElementById('get-weather-btn').addEventListener('click', function () {
  const location = document.getElementById('location').value.trim();
  
  const apiKey = prompt("Please enter your WeatherAPI key:");

  if (location === "") {
    alert("Please enter a location.");
    return;
  }

  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert("Location not found, please try again.");
        return;
      }

      const weatherInfo = document.getElementById('weather-info');
      weatherInfo.innerHTML = `
        <p><strong>Location:</strong> ${data.location.name}, ${data.location.country}</p>
        <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
        <p><strong>Condition:</strong> ${data.current.condition.text}</p>
        <p><strong>Wind:</strong> ${data.current.wind_kph} km/h</p>
        <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
        <p><strong>Air Quality Index (AQI):</strong> ${data.current.air_quality.pm10}</p>
      `;
      weatherInfo.style.display = 'block';
    })
    .catch(error => {
      alert("There was an error fetching the weather data.");
      console.error(error);
    });
});

