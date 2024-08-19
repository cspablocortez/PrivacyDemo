async function getCity() {
    try {
      const response = await fetch('https://ipinfo.io/json?token=4a3497ed17ff2c');
      const data = await response.json();
      document.querySelector('.location').innerText = data.city ? data.city : "City not found";
      document.querySelector('.ip').innerText = data.ip ? data.ip : "IP not found";

      console.log(data.ip);

    } catch (error) {
      document.querySelector('.location').innerText = "UNKNOWN";
    }
}


async function pasteClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        document.querySelector('.clipboard-content').innerText = text ? text : "...";
    } catch (error) {
        document.querySelector('.clipboard-content').innerText = "N/A";
    }
}

function displayBatteryLife() {
  if ('getBattery' in navigator) {
      navigator.getBattery().then(function(battery) {
          updateBatteryLevel(battery.level);
          battery.addEventListener('levelchange', function() {
              updateBatteryLevel(battery.level);
          });
      });
  } else {
      console.log("Battery Status API is not supported on this browser.");
  }
}

function updateBatteryLevel(level) {
  const batteryLifeSpan = document.getElementById('battery-life');
  if (batteryLifeSpan) {
      const batteryPercentage = Math.round(level * 100) + '%';
      batteryLifeSpan.textContent = batteryPercentage;
  } 
}

// Call the function to display battery life
displayBatteryLife();
