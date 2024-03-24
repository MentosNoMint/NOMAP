let searhForm = document.querySelector('#form-search');
let url = 'http://127.0.0.1:8000/api/'
let backTolist = document.querySelector('.backTo')
let fromTolist = document.querySelector('.fromTo')
let SelectTolist = document.querySelector('.SelectPlace')
let formBooking = document.querySelector('#form-booking')

formBooking.addEventListener('submit', async (e) => {
    e.preventDefault();
})
searhForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(searhForm);

    let from = formData.get('froms')
    let to = formData.get('Where')
    let departing = formData.get('departing')
    let returning = formData.get('Returning')
    let passegers = formData.get('Passengers')

    let responseAirportFrom = await fetch(`${url}airport?query=${from}`, {
        method: "GET"
    })
    let contentAirportFrom = await responseAirportFrom.json();
    contentAirportFrom.data.items.map(async a => {
        let responseAirportTo = await fetch(`${url}airport?query=${to}`, {
            method: "GET"
        })
        let contentAirportTo = await responseAirportTo.json();
        contentAirportTo.data.items.map(async b => {
            let responseFlight = await fetch(`${url}flight?from=${a.iata}&to=${b.iata}&date1=${departing}&date2=${returning}&passengers=${passegers}`, {
                method: "GET"
            })
            let contentFlightResult = await responseFlight.json();
            contentFlightResult.data.flights_back.map(async c => {
                backTolist.innerHTML +=
                    `
                    <div class="w-[800px] h-[50px] border-[1px] rounded-[15px] mt-[25px] flex divWrap " id="${c.flight_id}">
                    <div class="flex flex-col items-center justify-center" id="${c.flight_id}">
                        <span class="mx-[20px]" id="${c.flight_id}">Номер рейса:${c.flight_id}</span>
                        <span id="${c.flight_id}">самолет:${c.flight_code}</span>
                    </div>
                    <div class="flex flex-col items-center justify-center" id="${c.flight_id}">
                        <span class="mx-[20px]">Дата отправления:${c.from.date}</span id="${c.flight_id}">
                        <span id="${c.flight_id}">время отправления:${c.from.time}</span>
                    </div>
                    <div class="flex flex-col items-center justify-center" id="${c.flight_id}">
                        <span class="mx-[20px]" id="${c.flight_id}">Время прибытия:${c.to.time}</span>
                        <span id="${c.flight_id}">время в полете:</span>
                    </div>
                    <div class="flex flex-col items-center justify-center" id="${c.flight_id}">
                        <span class="mx-[20px]" id="${c.flight_id}">цена:${c.cost}</span>
                        <button class="bg-red-300 myElement" id="${c.flight_id}" onclick="replaceWindow('fromPage')">Выбрать</button>
                    </div>
                </div>
            `

             


                document.addEventListener('click', (e) => {
                    let targetRace = e.target;

                    let currentId = targetRace.id



                    if (currentId == c.flight_id) {
                        localStorage.setItem('objBack', JSON.stringify(c));
                        let select = JSON.parse(localStorage.getItem('objBack'))
                        console.log(select.flight_id)
                        console.log(localStorage.getItem('objBack'))
                        SelectTolist.innerHTML +=
                            `
                <div class="w-[800px] h-[50px] border-[1px] rounded-[15px] mt-[25px] flex divWrap" id="">
                <div class="flex flex-col items-center justify-center" id="">
                    <span class="mx-[20px]" id="">Номер рейса:${select.flight_id}</span>
                    <span id="">самолет:${select.flight_code}</span>
                </div>
                <div class="flex flex-col items-center justify-center" id="">
                    <span class="mx-[20px]">Дата отправления:${select.from.date}</span id="">
                    <span id="">время отправления:${select.from.time}</span>
                </div>
                <div class="flex flex-col items-center justify-center" id="">
                    <span class="mx-[20px]" id="">Время прибытия:${select.to.time}</span>
                    <span id="">время в полете:</span>
                </div>
                <div class="flex flex-col items-center justify-center" id="">
                    <span class="mx-[20px]" id="">цена:${select.cost}</span>
                </div>
            </div>
                `
                    }
                })
            })
            contentFlightResult.data.flights_to.map(async cd => {

                fromTolist.innerHTML +=

                    `
                <div class="w-[800px] h-[50px] border-[1px] rounded-[15px] mt-[25px] flex divWrap" id="${cd.flight_id}">
                <div class="flex flex-col items-center justify-center" id="${cd.flight_id}">
                    <span class="mx-[20px]" id="${cd.flight_id}">Номер рейса:${cd.flight_id}</span>
                    <span id="${cd.flight_id}">самолет:${cd.flight_code}</span>
                </div>
                <div class="flex flex-col items-center justify-center" id="${cd.flight_id}">
                    <span class="mx-[20px]">Дата отправления:${cd.from.date}</span id="${cd.flight_id}">
                    <span id="${cd.flight_id}">время отправления:${cd.from.time}</span>
                </div>
                <div class="flex flex-col items-center justify-center" id="${cd.flight_id}">
                    <span class="mx-[20px]" id="${cd.flight_id}">Время прибытия:${cd.to.time}</span>
                    <span id="${cd.flight_id}">время в полете:</span>
                </div>
                <div class="flex flex-col items-center justify-center" id="${cd.flight_id}">
                    <span class="mx-[20px]" id="${cd.flight_id}">цена:${cd.cost}</span>
                    <button class="bg-red-300 myElement" id="${cd.flight_id}" onclick="replaceWindow('bookingPage')">Выбрать</button>
                </div>
            </div>
                `

              

                document.addEventListener('click', (e) => {
                    let targetRace = e.target;

                    let currentId = targetRace.id


                    if (currentId == cd.flight_id) {

                        localStorage.setItem('objFrom', JSON.stringify(cd));
                        let select = JSON.parse(localStorage.getItem('objFrom'))
                        console.log(localStorage.getItem('objFrom'))
                        SelectTolist.innerHTML +=
                            `
            <div class="w-[800px] h-[50px] border-[1px] rounded-[15px] mt-[25px] flex divWrap" id="">
            <div class="flex flex-col items-center justify-center" id="">
                <span class="mx-[20px]" id="">Номер рейса:${select.flight_id}</span>
                <span id="">самолет:${select.flight_code}</span>
            </div>
            <div class="flex flex-col items-center justify-center" id="">
                <span class="mx-[20px]">Дата отправления:${select.from.date}</span id="">
                <span id="">время отправления:${select.from.time}</span>
            </div>
            <div class="flex flex-col items-center justify-center" id="">
                <span class="mx-[20px]" id="">Время прибытия:${select.to.time}</span>
                <span id="">время в полете:</span>
            </div>
            <div class="flex flex-col items-center justify-center" id="">
                <span class="mx-[20px]" id="">цена:${select.cost}</span>
            </div>
        </div>
            `
                    }
                })

            })
        })

    })

})