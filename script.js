

const apiKey = '55bccadefc3239388d8477c2d21b58db';
let cities = [];

const cityInput = document.getElementById('cityInput');
const suggestions = document.getElementById('suggestions');
const cityList = document.getElementById('cityList');
const showAllBtn = document.getElementById('showAllBtn');
const gpsBtn = document.getElementById('gpsBtn');
const weatherDisplay = document.getElementById('weatherDisplay');


fetch('cities.json')
  .then(res => res.json())
  .then(data => { cities = data; })
  .catch(err => console.error('Error loading cities:', err));


cityInput.addEventListener('input', () => {
  const input = cityInput.value.toLowerCase();
  suggestions.innerHTML = '';
  if (input.length === 0) return;
  const filtered = cities.filter(c => c.toLowerCase().startsWith(input));
  filtered.slice(0, 10).forEach(city => {
    const li = document.createElement('li');
    li.textContent = city;
    li.onclick = () => selectCity(city);
    suggestions.appendChild(li);
  });
});


showAllBtn.onclick = () => {
  cityList.classList.toggle('hidden');
  if (!cityList.classList.contains('hidden')) {
    cityList.innerHTML = '';
    cities.forEach(city => {
      const div = document.createElement('div');
      div.textContent = city;
      div.onclick = () => selectCity(city);
      cityList.appendChild(div);
    });
  }
};


gpsBtn.onclick = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      fetchWeatherByCoords(latitude, longitude);
    }, () => {
      alert('Unable to retrieve your location');
    });
  } else {
    alert('Geolocation not supported by your browser');
  }
};

function selectCity(city) {
  cityInput.value = city;
  suggestions.innerHTML = '';
  fetchWeather(city);
}

function fetchWeatherByCoords(lat, lon) {
  weatherDisplay.innerHTML = '<h1>Loading current location...</h1>';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetchWeatherFromURL(url);
}

function fetchWeather(city) {
  weatherDisplay.innerHTML = '<h1>Loading...</h1>';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeatherFromURL(url);
}



function fetchWeatherFromURL(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) {
        weatherDisplay.innerHTML = `<h1>${data.message}</h1>`;
        return;
      }

      const temp = data.main.temp;
      const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      const weatherMain = data.weather[0].main.toLowerCase(); 

     
      let bgImage = '';

      if (weatherMain.includes('rain')) {
        bgImage = "url('https://images.unsplash.com/photo-1511634829096-045a111727eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmFpbnxlbnwwfHwwfHx8MA%3D%3D')";
      } else if (weatherMain.includes('snow')) {
        bgImage = "url('https://images.unsplash.com/photo-1542601098-8fc114e148e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25vd3xlbnwwfHwwfHx8MA%3D%3D')";
      } else if (weatherMain.includes('cloud')) {
        bgImage = "url('https://images.unsplash.com/photo-1500740516770-92bd004b996e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdWR5fGVufDB8fDB8fHww')";
      } else if (weatherMain.includes('clear')) {
        bgImage = "url('https://plus.unsplash.com/premium_photo-1727730047398-49766e915c1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2xlYXIlMjBza3l8ZW58MHx8MHx8fDA%3D')";
      } else if (weatherMain.includes('thunder')) {
        bgImage = "url('https://images.unsplash.com/photo-1504123010103-b1f3fe484a32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGh1bmRlcnxlbnwwfHwwfHx8MA%3D%3D')";
      } else if (weatherMain.includes('mist') || weatherMain.includes('fog') || weatherMain.includes('haze')) {
        bgImage = "url('https://images.unsplash.com/photo-1463171515643-952cee54d42a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWlzdHxlbnwwfHwwfHx8MA%3D%3D')";
      } else {
        if (temp <= 0) {
          bgImage = "url('https://images.unsplash.com/photo-1516047487059-fd288d84e8cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNvbGR8ZW58MHx8MHx8fDA%3D')";
        } else if (temp <= 15) {
          bgImage = "url('https://images.unsplash.com/photo-1542601098-8fc114e148e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c25vd3xlbnwwfHwwfHx8MA%3D%3D')";
        } else if (temp <= 25) {
          bgImage = "url('https://images.unsplash.com/photo-1701002360305-8bf462eb8e1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1pbGQlMjB3ZWF0aGVyfGVufDB8fDB8fHww')";
        } else if (temp <= 35) {
          bgImage = "url('https://images.unsplash.com/photo-1605371893234-db5e7b01aad2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2FybSUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D')";
        } else {
          bgImage = "url('https://images.unsplash.com/photo-1561473880-3b8b12de0a71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D')";
        }
      }

      document.body.style.backgroundImage = bgImage;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.transition = 'background-image 1s ease';

    
      weatherDisplay.innerHTML = `
        <h1>${data.name}, ${data.sys.country}</h1>
        <div class="temp-large">${data.main.temp}°C</div>
        <img src="${icon}" alt="weather icon">
        <div class="weather-info">
          <div class="info-card"><strong>${data.weather[0].main}</strong><br>${data.weather[0].description}</div>
          <div class="info-card"><strong>Humidity</strong><br>${data.main.humidity}%</div>
          <div class="info-card"><strong>Wind</strong><br>${data.wind.speed} m/s</div>
          <div class="info-card"><strong>Feels Like</strong><br>${data.main.feels_like}°C</div>
          <div class="info-card"><strong>Pressure</strong><br>${data.main.pressure} hPa</div>
        </div>
      `;

      
      const tips = {
        rain: "Carry an umbrella and wear waterproof shoes.",
        snow: "Dress warmly in layers and drive carefully.",
        cloud: "A calm day! Ideal for indoor or light outdoor activities.",
        clear: "Perfect day for a walk or picnic! Don't forget sunscreen.",
        thunder: "Avoid open areas, stay indoors when possible.",
        mist: "Drive slowly and use fog lights.",
        haze: "Limit outdoor activity, especially if you have breathing issues.",
        default: "Stay hydrated and dress appropriately for the weather."
      };

      let lifestyleMessage = tips.default;
      for (const key in tips) {
        if (weatherMain.includes(key)) {
          lifestyleMessage = tips[key];
          break;
        }
      }

      const lifestyleDiv = document.getElementById('lifestyleTips');
      lifestyleDiv.innerHTML = `
        <div class="lifestyle-box">
          <h2>Lifestyle Tip 🌿</h2>
          <p>${lifestyleMessage}</p>
        </div>
      `;
    })
    .catch(() => {
      weatherDisplay.innerHTML = '<h1>Error fetching data</h1>';
    });
}

const mapBtn = document.getElementById('mapBtn');
const mapModal = document.getElementById('mapModal');
let map;

mapBtn.onclick = () => {
  mapModal.style.display = 'block';
  if (!map) {
    initMap();
  }
};

function closeMap() {
  mapModal.style.display = 'none';
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 20.5937, lng: 78.9629 }, 
    zoom: 4
  });

  map.addListener('click', function (e) {
    const lat = e.latLng.lat();
    const lon = e.latLng.lng();
    closeMap();
    fetchWeatherByCoords(lat, lon);
  });
}

