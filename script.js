const API_KEY = "b674e52c9ce2c227bde8a0edb8a98729"; // Replace with your OpenWeatherMap API key

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
  try {
    // Step 1: Get coordinates
    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    const geoData = await geoRes.json();

    if (!geoData.length) {
      document.querySelector(".city").innerHTML = "City not found";
      document.querySelector(".temp").innerHTML = "--°C";
      document.querySelector(".Humidity").innerHTML = "--%";
      document.querySelector(".wind").innerHTML = "-- km/h";
      weatherIcon.src = "images/mist.png"; // fallback
      return;
    }

    const { lat, lon } = geoData[0];

    // Step 2: Get weather data
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await weatherRes.json();

    // Step 3: Update UI
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".Humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " m/s";

    // Step 4: Weather icons
    const condition = data.weather[0].main;
    if (condition === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (condition === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (condition === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (condition === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (condition === "Mist") {
      weatherIcon.src = "images/mist.png";
    } else {
      weatherIcon.src = "images/clouds.png"; // default fallback
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

// Button click event
searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
});

// Press Enter to search
searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getWeather(searchBox.value);
  }
});
