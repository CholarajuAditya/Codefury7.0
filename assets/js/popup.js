const popupModal = document.getElementById('popupModal');
const closePopup = document.getElementById('closePopup');
const goToPage = document.getElementById('goToPage');


function showModal() {
    popupModal.style.display = 'block';
}

function closeModal() {
    popupModal.style.display = 'none';
}


setTimeout(showModal, 2000); // Change 3000 to the number of milliseconds you want


closePopup.onclick = function() {
    closeModal();
}


goToPage.onclick = function() {
    window.location.href = '../views/form.html'; // Replace with your desired URL
}

window.onclick = function(event) {
    if (event.target == popupModal) {
        closeModal();
    }
}