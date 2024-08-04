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