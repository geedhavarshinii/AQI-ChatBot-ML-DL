export function generateResponse(aqi) {
    if (aqi <= 50) {
      return "The air quality in your area is good! The AQI is " + aqi + ". It's a great day to spend time outdoors!";
    } else if (aqi <= 100) {
      return "The air quality in your area is moderate. The AQI is " + aqi + ". Sensitive individuals should consider limiting prolonged outdoor exertion.";
    } else if (aqi <= 150) {
      return "The air quality in your area is unhealthy for sensitive groups. The AQI is " + aqi + ". People with respiratory or heart conditions should limit outdoor activities.";
    } else {
      return "The air quality in your area is unhealthy. The AQI is " + aqi + ". Everyone should limit outdoor activities and stay indoors if possible.";
    }
  }