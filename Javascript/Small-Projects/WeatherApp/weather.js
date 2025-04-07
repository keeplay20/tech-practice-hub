console.log("Weather App JS Loaded");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const weatherResult = document.getElementById("weatherResult");

const takeInput = () => {
  const city = searchInput.value.trim();
  if (city) {
    getWeatherByCity(city);
  }
  console.log(city);
};

searchBtn.addEventListener("click", takeInput);
searchInput.addEventListener("input", () => {
  const city = searchInput.value.trim();
  searchBtn.disabled = city === "";
});

const toggleThemeBtn = document.getElementById("toggleTheme");

toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  toggleThemeBtn.textContent = isDark ? "☀️" : "🌙";
});

const getWeatherByCity = async (city) => {
  const ***REMOVED*** = "0f11f0fe44071eed5443ca3f9233f74e";
  const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${***REMOVED***}&units=metric`;
  try {
    const response = await fetch(WEATHER_URL);
    if (!response.ok) {
      weatherResult.innerHTML = `<p> City not found. Please try again.</p>`;
      return;
    }
    const data = await response.json();
    const condition = data.weather[0].main.toLowerCase();
    console.log("Condition is :", condition);
    let animationSrc = "";
    if (condition.includes("clear")) {
      animationSrc =
        "https://lottie.host/c67d7a3c-25e9-406f-9697-8ea3be0edec6/tdk0Mg4KNn.json";
    } else if (condition.includes("sunny")) {
      animationSrc =
        "https://lottie.host/32f99fb5-d35a-4d62-8d60-381f144ef38e/vkMEiqvyMk.json";
    } else if (condition.includes("rain")) {
      animationSrc =
        "https://lottie.host/10fc1696-7f8f-40ed-9b08-4fd6ff33de21/ZCnba4Gzaf.json";
    } else if (condition.includes("clouds")) {
      animationSrc =
        "https://lottie.host/5c43907b-35b0-4636-b6e7-79643f10601e/hGYfaAqx8C.json";
    } else {
      animationSrc =
        "https://lottie.host/7333ba1a-6bd3-476a-8fdc-f2015caf7a18/evbCMIW83z.json"; // fallback
    }

    document.getElementById("weatherAnimation").innerHTML = `
        <lottie-player src="${animationSrc}" background="transparent" speed="1" style="width: 200px; height: 200px;" loop autoplay></lottie-player>
      `;
    weatherResult.innerHTML = `<h2>Weather in ${data.name} </h2> 
  <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
  <p><strong>Description:</strong> ${data.weather[0].description}</p>
  <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
  <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>`;
  } catch (error) {
    weatherResult.innerHTML = `<p>Error fetching weather data. ${error}.</p>`;
  }
};
