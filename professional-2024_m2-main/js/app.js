// let btn = document.querySelector('.createElement')
// let Deletebtn = document.querySelector('.deleteElement')
// let index = 0;

// btn.addEventListener('click' , () => {
//     let divs = document.createElement('div')
//     divs.id = index;
//     divs.innerHTML = 
//     `
//     <div class="w-[700px] h-[50px] border-[5px] border-black"></div>
//     `
//     document.querySelector('.elementPat').appendChild(divs)
//     index++
// })


// Deletebtn.addEventListener('click' , (e) => {
//    let checkId = e.target
// })



let searhForm = document.querySelector('#form-search');
let url = '127.0.0.1:8000)/api/'
let backTolist = document.querySelector('.backTo')
let fromTolist = document.querySelector('.fromTo')

searhForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(searhForm);

    let from = formData.get('from')
    let to = formData.get('to-where')
    let departing = formData.get('departing')
    let returning = formData.get('returning')
    let passegers = formData.get('passegers')

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
            console.log(contentFlightResult.data)

            contentFlightResult.data.flights_back.map(async c => {
                console.log(c.flight_id)




                backTolist.innerHTML +=
                    `
                    <div class="w-[800px] h-[50px] border-[1px] rounded-[15px] mt-[25px] flex border-white divWrap " id="${c.flight_id}">
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
                        <button class="bg-red-300 myElement" id="${c.flight_id}">Выбрать</button>
                    </div>
                </div>
            `
            })
            contentFlightResult.data.flights_to.map(async cd => {
                console.log('получаю с cd', cd)
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
                <button class="bg-red-300 myElement" id="${cd.flight_id}">Выбрать</button>
            </div>
        </div>
            `



                document.addEventListener('click', (e) => {
                    let targetRace = e.target;

                    let currentId = targetRace.id

                    console.log(currentId)
                })



            })
        })

    })

})
