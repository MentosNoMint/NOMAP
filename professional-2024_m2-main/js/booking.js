let form_booking = document.getElementById('form-booking');


form_booking.addEventListener('submit', async (e) => {
    e.preventDefault();

    let formData = new FormData(form_booking);

    let first_name = formData.get('nameL');
    let last_name = formData.get('first_nameL');
    let birth_date = formData.get('birthL');
    let document_number = formData.get('document_numberL');
    let selectFrom = JSON.parse(localStorage.getItem('objFrom'))
    let selectBack = JSON.parse(localStorage.getItem('objBack'))
    let passengers = [{
        "first_name": first_name,
        "last_name": last_name,
        "birth_date": birth_date,
        "document_number": document_number
    }];

    let flight_from = {
        "id": selectFrom.flight_id,
        "date": selectFrom.from.date
    }

    let flight_back = {
        "id": selectBack.flight_id,
        "date": selectBack.from.date
    }

    console.log(passengers, flight_back, flight_from)

    let contentBooking = await fetch('http://127.0.0.1:8000/api/booking', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flight_from, flight_back, passengers })
    })
    let resBooking = await contentBooking.json();
    localStorage.setItem('code' , resBooking.data.code);
})


