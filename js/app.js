async function getWeather() {
    const city = document.getElementById("city").value.trim();
    const apiKey = "879c719c673c15c2846471e68b893184"; // Replace with your OpenWeather API key
    const resultDiv = document.getElementById("weather-result");
    
    // Clear previous results
    resultDiv.innerHTML = "";

    if (!city) {
        resultDiv.innerHTML = "<p class='error'>Please enter a city name.</p>";
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        const weather = `
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        resultDiv.innerHTML = weather;
    } catch (error) {
        resultDiv.innerHTML = `<p class='error'>${error.message}</p>`;
    }
}