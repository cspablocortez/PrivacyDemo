async function getCity() {
    try {
      const response = await fetch('https://ipinfo.io/json?token=4a3497ed17ff2c');
      const data = await response.json();
      document.querySelector('.location').innerText = data.city ? data.city : "City not found";
    } catch (error) {
      document.querySelector('.location').innerText = "UNKNOWN";
    }
  }
  
  getCity();