const carousel = document.getElementById('carousel');

// Example: Dynamically add a notification after 5 seconds
setTimeout(() => {
    const newNotification = document.createElement('div');
    newNotification.className = 'notification';
    newNotification.textContent = 'Notification 4: A new event is coming up!';
    carousel.appendChild(newNotification);
}, 5000);