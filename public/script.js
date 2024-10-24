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

displayBatteryLife();

function findAndDisplayUserName() {
  let name = findUserName();
  document.getElementById('result').innerText = "User Name: " + name;
}

function findUserName() {
  let cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith("name=")) {
          return cookie.split('=')[1];
      }
  }

  if (localStorage.getItem('name')) {
      return localStorage.getItem('name');
  }

  if (sessionStorage.getItem('name')) {
      return sessionStorage.getItem('name');
  }

  return "Name not found";
}

function dumpLocalStorage() {
  const localStorageDump = {};
  let dumpHtml = '';

  if (localStorage.length === 0) {
      dumpHtml = '<p>Nothing saved in local storage.</p>';
  } else {
      dumpHtml = '<ul>';
      for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const value = localStorage.getItem(key);
          localStorageDump[key] = value;
          dumpHtml += `<li><strong>${key}</strong>: ${value}</li>`;
      }
      dumpHtml += '</ul>';
  }

  const dumpDiv = document.getElementById('localStorage-dump');
  if (dumpDiv) {
      dumpDiv.innerHTML = dumpHtml;
  } else {
      console.warn('Div with id "localStorage-dump" not found.');
  }

  return localStorageDump;
}

dumpLocalStorage();
