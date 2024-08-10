function showSidebar(){
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "flex";
}

function hideSidebar(){
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
}

const carousel = document.getElementById('carousel');


setTimeout(() => {
    const newNotification = document.createElement('div');
    newNotification.className = 'notification';
    newNotification.textContent = 'Notification 4: A new event is coming up!';
    carousel.appendChild(newNotification);
}, 5000);