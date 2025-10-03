// Function: Fetch Weather Data
async function fetchWeatherData(location) {
    const url = `https://wttr.in/${location}?format=j1`;
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.error('Fetching weather data error:', error);
        throw error;
        
    }
}

// Function: Display Weather Data
function displayWeatherData(data) {
    document.getElementById('weatherData').innerHTML = `
        <h2>Weather in ${data.nearest_area[0].areaName[0].value}</h2>
        <p>Condition: ${data.current_condition[0].weatherDesc[0].value}</p>
        <p>Temperature: ${data.current_condition[0].temp_C}°C</p>
    `;
}

// Function: Get Weather
async function getWeather(location) {
    try {
        const weatherData = await fetchWeatherData(location);
        displayWeatherData(weatherData);
        
    } catch (error) {
        document.getElementById('weatherData').innerHTML = `<p>Error fetching and displaying weather data.</p>`;
    }
}

// Event Listener for Form Submission
document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const location = document.getElementById('locationInput').value;
    await getWeather(location);
});
