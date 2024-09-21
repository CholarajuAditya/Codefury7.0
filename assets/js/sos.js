document.getElementById('sosButton').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const locationMessage = `SOS! I need help! My location is: https://www.google.com/maps?q=${latitude},${longitude}`;

            // Create the SMS link
            const smsLink = `sms:+1234567890?body=${encodeURIComponent(locationMessage)}`;

            // Redirect to the SMS link
            window.location.href = smsLink;

        }, error => {
            alert('Error getting location: ' + error.message);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
})
