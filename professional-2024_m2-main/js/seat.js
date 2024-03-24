let formSeat = document.getElementById('seat-form')

formSeat.addEventListener('submit', async (e) => {
    e.preventDefault()
    let formData = new FormData(formSeat);
    let seat = formData.get('seat');
    console.log(seat)


    let contentCode = await fetch(`http://127.0.0.1:8000/api/booking/${localStorage.getItem('code')}`, {
        method: "GET"
    })

    let resCode = await contentCode.json();

    resCode.data.passengers.map(a => {
        let passenger = a.id;
        let type = 'from';
        console.log(passenger)
        fetch(`http://127.0.0.1:8000/api/booking/${localStorage.getItem('code')}/seat`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ passenger, seat, type })
        })
    })
})