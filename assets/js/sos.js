const sosLink = document.getElementById('SOS');

// Function to handle position updates
function handlePosition(position) {
    const { latitude, longitude } = position.coords;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    const message = `My location is: https://maps.google.com/?q=${latitude},${longitude}`;
    
    // Update the href attribute of the link to include the location in the SMS body
    sosLink.href = `sms:+918971234144?body=${encodeURIComponent(message)}`;
}

// Function to handle errors
function handleError(error) {
    console.error(`Error: ${error.message}`);
}

// Add event listener to the link
sosLink.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default link behavior

    // Start watching the position
    navigator.geolocation.watchPosition(handlePosition, handleError);
});