// ---------------- DATA ----------------
const ALL_SERVICES = [
    { id: 1, name: 'Deep Home Cleaning', category: 'Cleaning', price: 120, rating: 4.8 },
    { id: 2, name: 'Hair Spa', category: 'Beauty', price: 85, rating: 4.9 },
    { id: 3, name: 'AC Repair', category: 'Repairs', price: 45, rating: 4.7 },
    { id: 4, name: 'Math Tutoring', category: 'Tutoring', price: 35, rating: 5.0 }
];

let bookingsState = JSON.parse(localStorage.getItem("bookings")) || [];
let currentActiveService = null;

// ---------------- NAVIGATION ----------------
function navigateTo(view) {
    const container = document.getElementById('view-container');
    const template = document.getElementById(`${view}-template`).innerHTML;

    container.innerHTML = template;
    window.scrollTo(0, 0);
}

// ---------------- SERVICES ----------------
function renderServices() {
    const container = document.getElementById('service-list');

    container.innerHTML = ALL_SERVICES.map(service => `
        <div class="service-card" onclick="selectService(${service.id})">
            <h3>${service.name}</h3>
            <p>₹${service.price}</p>
            <p>⭐ ${service.rating}</p>
        </div>
    `).join('');
}

function selectService(id) {
    currentActiveService = ALL_SERVICES.find(s => s.id === id);
    navigateTo('booking');
}

// ---------------- BOOKING ----------------
function processBooking() {
    const date = document.getElementById('book-date').value;

    if (!date) {
        alert("Select a date");
        return;
    }

    const booking = {
        id: Date.now(),
        service: currentActiveService.name,
        date: date,
        price: currentActiveService.price
    };

    bookingsState.push(booking);

    localStorage.setItem("bookings", JSON.stringify(bookingsState));

    alert("Booking Confirmed!");
    navigateTo('dashboard');
}

// ---------------- DASHBOARD ----------------
function loadBookings() {
    const container = document.getElementById('dashboard-bookings');

    if (bookingsState.length === 0) {
        container.innerHTML = "<p>No bookings yet</p>";
        return;
    }

    container.innerHTML = bookingsState.map(b => `
        <div>
            <h4>${b.service}</h4>
            <p>${b.date}</p>
            <p>₹${b.price}</p>
        </div>
    `).join('');
}

// ---------------- INIT ----------------
window.onload = () => {
    navigateTo('home');
};
