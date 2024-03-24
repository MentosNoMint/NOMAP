const formSearch = document.getElementById('form-search');
const listAirport = document.querySelector('.datalistAirportFrom');
const listAirport2 = document.querySelector('.datalistAirportWhere');
const inputElement = document.getElementById('froms');
const inputElement2 = document.getElementById('where');
let backTolist = document.querySelector('.backTo');
let fromTolist = document.querySelector('.fromTo')
let btnTicket = document.querySelector('.myElement');
let SelectTolist = document.querySelector('.SelectPlace');

//Функция для reallife поиска аэропортов
async function inputSearch(code) {
    let contentAirport = await fetch(`${url}/api/airport?query=${code}`, {
        method: 'GET'
    })
    let resAirport = await contentAirport.json();

    return resAirport.data.items;
}

//Передаю значение из input в функцию inputSearch() обновляя каждую букву
inputElement.addEventListener('input', async () => {
    const inputValue = inputElement.value;
    const items = await inputSearch(inputValue);
    const nameAirport = items.map(a => {
        return `
        <option value="${a.iata}" id="${a.iata}">${a.name}</option>
        `
    })
    listAirport.innerHTML = nameAirport;
})

//Передаю значение из input2 в функцию inputSearch() обновляя каждую букву
inputElement2.addEventListener('input', async () => {
    const inputValue = inputElement2.value;
    const items = await inputSearch(inputValue);
    const nameAirport = items.map(a => {
        return `
        <option value="${a.iata}" id="${a.iata}">${a.name}</option>
        `
    })
    listAirport2.innerHTML = nameAirport;
})

//Обработка формы form-search 
formSearch.addEventListener('submit', async (e) => {
    e.preventDefault();

    let formData = new FormData(formSearch);
    let from = formData.get('froms');
    let to = formData.get('where');
    let departing = formData.get('departing');
    let returning = formData.get('returning');
    let passengers = formData.get('passengers');

    let responseFlight = await fetch(`${url}/api/flight?from=${from}&to=${to}&date1=${departing}&date2=${returning}&passengers=${passengers}`, {
        method: "GET"
    })
    let contentFlightResult = await responseFlight.json();
    console.log(contentFlightResult.data)



    //flight back экран

    for (i = 0; i < contentFlightResult.data.flights_back.length; i++) {
        backTolist.innerHTML +=
            `
    <div class="w-[800px] h-[50px] border-[1px] rounded-[15px] mt-[25px] flex border-white divWrap " id="${contentFlightResult.data.flights_back[i].flight_id}">
    <div class="flex flex-col items-center justify-center" id="${contentFlightResult.data.flights_back[i].flight_id}">
        <span class="mx-[20px]" id="${contentFlightResult.data.flights_back[i].flight_id}">Номер рейса:${contentFlightResult.data.flights_back[i].flight_id}</span>
        <span id="${contentFlightResult.data.flights_back[i].flight_id}">самолет:${contentFlightResult.data.flights_back[i].flight_code}</span>
    </div>
    <div class="flex flex-col items-center justify-center" id="${contentFlightResult.data.flights_back[i].flight_id}">
        <span class="mx-[20px]">Дата отправления:${contentFlightResult.data.flights_back[i].from.date}</span id="${contentFlightResult.data.flights_back[i].flight_id}">
        <span id="${contentFlightResult.data.flights_back[i].flight_id}">время отправления:${contentFlightResult.data.flights_back[i].from.time}</span>
    </div>
    <div class="flex flex-col items-center justify-center" id="${contentFlightResult.data.flights_back[i].flight_id}">
        <span class="mx-[20px]" id="${contentFlightResult.data.flights_back[i].flight_id}">Время прибытия:${contentFlightResult.data.flights_back[i].to.time}</span>
        <span id="${contentFlightResult.data.flights_back[i].flight_id}">время в полете:</span>
    </div>
    <div class="flex flex-col items-center justify-center" id="${contentFlightResult.data.flights_back[i].flight_id}">
        <span class="mx-[20px]" id="${contentFlightResult.data.flights_back[i].flight_id}">цена:${contentFlightResult.data.flights_back[i].cost}</span>
        <button class="bg-red-300 myElement" id="${contentFlightResult.data.flights_back[i].flight_id}" onclick="replaceWindow('fromPage')">Выбрать</button>
    </div>
</div>
    `
    }

    //Запись выбраного рейса back и его вывод
    backTolist.addEventListener('click', (e) => {
        if (e.target.classList.contains('myElement')) {
            let currentId = e.target.id;
            contentFlightResult.data.flights_back.map(c => {
                if (currentId == c.flight_id) {
                    localStorage.setItem('objBack', JSON.stringify(c));
                    let select = JSON.parse(localStorage.getItem('objBack'));
                    console.log(select.flight_id);
                    console.log(localStorage.getItem('objBack'));
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
            });
        }
    })

    for (i = 0; i < contentFlightResult.data.flights_to.length; i++) {
        fromTolist.innerHTML +=
            `
    <div class="w-[800px] h-[50px] border-[1px] rounded-[15px] mt-[25px] flex border-white divWrap " id="${contentFlightResult.data.flights_to[i].flight_id}">
    <div class="flex flex-col items-center justify-center" id="${contentFlightResult.data.flights_to[i].flight_id}">
        <span class="mx-[20px]" id="${contentFlightResult.data.flights_to[i].flight_id}">Номер рейса:${contentFlightResult.data.flights_to[i].flight_id}</span>
        <span id="${contentFlightResult.data.flights_to[i].flight_id}">самолет:${contentFlightResult.data.flights_to[i].flight_code}</span>
    </div>
    <div class="flex flex-col items-center justify-center" id="${contentFlightResult.data.flights_to[i].flight_id}">
        <span class="mx-[20px]">Дата отправления:${contentFlightResult.data.flights_to[i].from.date}</span id="${contentFlightResult.data.flights_to[i].flight_id}">
        <span id="${contentFlightResult.data.flights_to[i].flight_id}">время отправления:${contentFlightResult.data.flights_to[i].from.time}</span>
    </div>
    <div class="flex flex-col items-center justify-center" id="${contentFlightResult.data.flights_to[i].flight_id}">
        <span class="mx-[20px]" id="${contentFlightResult.data.flights_to[i].flight_id}">Время прибытия:${contentFlightResult.data.flights_to[i].to.time}</span>
        <span id="${contentFlightResult.data.flights_to[i].flight_id}">время в полете:</span>
    </div>
    <div class="flex flex-col items-center justify-center" id="${contentFlightResult.data.flights_to[i].flight_id}">
        <span class="mx-[20px]" id="${contentFlightResult.data.flights_to[i].flight_id}">цена:${contentFlightResult.data.flights_to[i].cost}</span>
        <button class="bg-red-300 myElement" id="${contentFlightResult.data.flights_to[i].flight_id}" onclick="replaceWindow('bookingPage')">Выбрать</button>
    </div>
</div>
    `
    }
    
    //Запись выбраного рейса from 
    fromTolist.addEventListener('click', (e) => {
        if (e.target.classList.contains('myElement')) {
            let currentId = e.target.id;
            contentFlightResult.data.flights_to.map(c => {
                if (currentId == c.flight_id) {
                    localStorage.setItem('objFrom', JSON.stringify(c));
                    let select = JSON.parse(localStorage.getItem('objFrom'));
                    console.log(localStorage.getItem('objFrom'));
                    
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
            });
        }
    })

     
})

