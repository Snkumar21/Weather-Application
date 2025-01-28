async function getWeather() {
    const city = document.getElementById("city").value.trim(); // Get the user input (city name)
    const apiKey = "879c719c673c15c2846471e68b893184"; // OpenWeather API key
    const resultDiv = document.getElementById("weather-result"); // Div to display weather results
    
    // Clear previous results
    resultDiv.innerHTML = "";

    // Validate input: Check if the city name is provided
    if (!city) {
        resultDiv.innerHTML = "<p class='error'>Please enter a city name.</p>";
        return;
    }

    try {
        // Fetch weather data from OpenWeather API
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        // If the response status is not OK, throw an error
        if (!response.ok) {
            throw new Error("City not found. Please try again.");
        }

        // Parse the JSON response
        const data = await response.json();

        // Extract relevant data from API response
        const weather = `
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;

        // Display weather information
        resultDiv.innerHTML = weather;

    } catch (error) {
        // Display error message in case of API issues or invalid input
        resultDiv.innerHTML = `<p class='error'>${error.message}</p>`;
    }
}
