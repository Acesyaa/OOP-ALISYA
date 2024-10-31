const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const rainOutput = document.getElementById('chanceOfRain');
const snowOutput = document.getElementById('chanceOfSnow');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const cities = document.querySelectorAll('.city');
const navToggle = document.getElementById('navToggle');
const navPanel = document.getElementById('navPanel');
const checklistButton = document.getElementById('checklistButton');
const recommendActi = document.querySelector('.recommend_acti');

navToggle.addEventListener('click', () => {
    navPanel.classList.toggle('show');
});

checklistButton.addEventListener('click', () => {
    window.location.href = 'listactivities.html';
});


let cityInput = "London";

function dayOfTheWeek(day, month, year) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[new Date(`${year}-${month}-${day}`).getDay()];
};

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "0";
    });
});

form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('Please type in a city name');
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
});

function fetchWeatherData() {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=2a084e7fd0f94eaf9c644353242810&q=${cityInput}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        temp.innerHTML = data.current.temp_c + "&deg;" + "C";
        conditionOutput.innerHTML = data.current.condition.text;

        const date = data.location.localtime;
        const y = parseInt(date.substr(0, 4));
        const m = parseInt(date.substr(5, 2));
        const d = parseInt(date.substr(8, 2));
        const time = date.substr(11);

        dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
        timeOutput.innerHTML = time;

        nameOutput.innerHTML = data.location.name;
        
        const iconUrl = "https:" + data.current.condition.icon;
        icon.src = iconUrl;
        
        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + "km/h";

        let timeOfDay = "day";
        const code = data.current.condition.code;

        if (!data.current.is_day) {
            timeOfDay = "night";
        }

        if (code == 1000) {
            app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
            recommendActivities('clear');
        } else if (
            code == 1003 || code == 1006 || code == 1009 || code == 1030 ||
            code == 1069 || code == 1087 || code == 1135 || code == 1273 ||
            code == 1276 || code == 1279 || code == 1282
        ) {
            app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
            recommendActivities('cloudy');
        } else if (
            code == 1063 || code == 1069 || code == 1072 || code == 1150 ||
            code == 1153 || code == 1180 || code == 1183 || code == 1186 ||
            code == 1189 || code == 1192 || code == 1195 || code == 1204 ||
            code == 1207 || code == 1240 || code == 1243 || code == 1246 ||
            code == 1249 || code == 1252
        ) {
            app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
            recommendActivities('rainy');
        } else {
            app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
            recommendActivities('snowy');
        }

        rainOutput.innerHTML = `${data.forecast.forecastday[0].day.daily_chance_of_rain}%`;
        snowOutput.innerHTML = `${data.forecast.forecastday[0].day.daily_chance_of_snow}%`;

        app.style.opacity = "1";
    })
    .catch(() => {
        alert("City not found, please try again");
        app.style.opacity = "1";
    });
}
function recommendActivities(weather) {
    let activities = {
        clear: ['Hiking', 'Picnicking', 'Cycling', 'Fishing', 'Camping'],
        snowy: ['Skiing', 'Snowshoeing', 'Ice skating', 'Sledding'],
        cloudy: ['Walking/Jogging', 'Outdoor Yoga', 'Gardening', 'Outdoor Painting/Drawing', 'Nature Photography'],
        rainy: ['Indoor Rock Climbing', 'Swimming', 'Cooking Class', 'Attend Local Event/Fair']
    };

    recommendActi.innerHTML = `Recommended Activities: ${activities[weather].join(', ')}`;
}

fetchWeatherData();
app.style.opacity = "1";