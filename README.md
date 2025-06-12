# 🌦️ GeoTemp Weather App

GeoTemp is a web-based weather application that allows users to search for weather information based on their location using the Google Maps Places API and a weather API (e.g., OpenWeatherMap). The app features real-time weather updates, location suggestions, and a responsive design.

## 🔧 Features

- 🌍 Location-based search with autocomplete using Google Maps Places API
- 🌦️ Real-time weather data (temperature, humidity, etc.)
- 📱 Responsive and modern UI
- ⚡ Fast loading with centered loader before main content loads

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/YourUsername/GeoTemp.git
cd GeoTemp
2. Install Dependencies
bash
Copy
Edit
npm install
3. Set Up API Keys
You will need a Google Maps JavaScript API key and a weather API key (e.g., from OpenWeatherMap).

➕ Add Your API Keys:
Go to src/api/config.js (or the file where you store your API keys).

Replace the placeholder with your actual API keys:

javascript
Copy
Edit
export const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY_HERE";
export const WEATHER_API_KEY = "YOUR_WEATHER_API_KEY_HERE";
4. Run the App
bash
Copy
Edit
npm start
🛠 Deployment (Optional)
To deploy the backend weather API (Firebase Cloud Functions):

bash
Copy
Edit
firebase deploy --only functions
Make sure you have Firebase CLI installed and initialized.

📁 Folder Structure
php
Copy
Edit
GeoTemp/
├── public/
├── src/
│   ├── components/
│   ├── api/
│   └── App.js
├── weatherapi/        # Firebase Cloud Functions folder
├── .gitignore
├── README.md
└── package.json

🙋‍♂️ Author
Developed by Shekhar Singh
