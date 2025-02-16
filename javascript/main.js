"use strict";

const buttonBookingEl = document.getElementById("button-booking");
const minaBokningar = document.getElementById("mina-bokningar");
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
const inlogged = document.getElementById("main-inlogg");
const loggaIn =document.getElementById("logga-in")


if(inlogged) {
// Visa alla bokningar vid sidladdning
window.addEventListener("load", () => {
    renderBookings();
});

function renderBookings() {
    if (bookings.length > 0) {
        minaBokningar.innerHTML = ""; // Töm innehållet innan vi lägger till nya bokningar
        bookings.forEach((booking, index) => {
            minaBokningar.innerHTML += `
            <div class="booking">
                <p class="p-bokningar"><strong>Från:</strong> ${booking.from}</p>
                <p class="p-bokningar"><strong>Till:</strong> ${booking.to}</p>
                <p class="p-bokningar"><strong>Datum:</strong> ${booking.date}</p>
                <p class="p-bokningar"><strong>Tid:</strong> ${booking.time}</p>
                <p class="p-bokningar"><strong>Återkommande resa:</strong> ${booking.radioTravelValue}</p>
                <p class="p-bokningar"><strong>Hur ofta:</strong> ${booking.howOftenValue}</p>
                <button class="btn btn-delete" data-index="${index}">Ta bort</button>
            </div>
            `;
        });

        // Lägg till eventlyssnare för varje "Ta bort"-knapp
        const deleteButtons = document.querySelectorAll(".btn-delete");
        deleteButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                deleteBooking(index);
            });
        });
    } else {
        minaBokningar.innerHTML = "<p>Inga bokningar hittades.</p>";
    }
}

function deleteBooking(index) {
    // Ta bort bokningen från arrayen
    bookings.splice(index, 1);

    // Uppdatera localStorage
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Uppdatera visningen
    renderBookings();
}

// Lägg till en ny bokning
buttonBookingEl.addEventListener("click", function () {
    const fromEl = document.getElementById("from").value;
    const toEl = document.getElementById("to").value;
    const dateEl = document.getElementById("date").value;
    const timeEl = document.getElementById("time").value;

    // Hämta vald radio-knapp för återkommande resa
    const radioTravelEl = document.querySelector('input[name="radio-travel"]:checked');
    const radioTravelValue = radioTravelEl ? radioTravelEl.value : null;

    // Hämta vald radio-knapp för hur ofta
    const howOftenEl = document.querySelector('input[name="how-often"]:checked');
    const howOftenValue = howOftenEl ? howOftenEl.value : null;

    // Kontrollera om alla fält är ifyllda
    if (!fromEl || !toEl || !dateEl || !timeEl || !radioTravelValue || !howOftenValue) {
        alert("Vänligen fyll i alla obligatoriska fält!");
        return; // Avbryt om något fält saknas
    }

    // Skapa en ny bokning
    const newBooking = {
        from: fromEl,
        to: toEl,
        date: dateEl,
        time: timeEl,
        radioTravelValue: radioTravelEl.value,
        howOftenValue: howOftenEl.value
    };

    // Lägg till den nya bokningen
    bookings.push(newBooking);

    // Spara tillbaka till localStorage
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Uppdatera visningen
    renderBookings();
});

}
if(loggaIn) {
document.addEventListener("DOMContentLoaded", function() {
    const buttonLogin = document.getElementById("btn-login");

    function Login() {
        buttonLogin.addEventListener("click", () => {
            const userNameEl = document.getElementById("username").value;
            const passwordEl = document.getElementById("password").value;

            if (userNameEl === "Stefan" && passwordEl === "123456") {
                window.location.href = "boka.html";
            } else {
                window.alert("Skriv in rätt användarnamn/lösenord");
            }
        });
    }
    Login(); // Kör funktionen


});
};
