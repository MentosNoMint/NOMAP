const formSearch = document.getElementById('form-search');
const listAirport = document.querySelector('.datalistAirportFrom');
const listAirport2 = document.querySelector('.datalistAirportWhere');
const inputElement = document.getElementById('froms');
const inputElement2 = document.getElementById('where');

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

    if (from === '' || to === '' || departing === '' || returning === '' || passengers === '') {
        alert('Вы пропустили поле формы')
    } else {
        let responseFlight = await fetch(`${url}/api/flight?from=${from}&to=${to}&date1=${departing}&date2=${returning}&passengers=${passengers}`, {
            method: "GET"
        })
        let contentFlightResult = await responseFlight.json();
        console.log(contentFlightResult)
    }
})


