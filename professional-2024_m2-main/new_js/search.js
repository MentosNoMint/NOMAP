const formSearch = document.getElementById('form-search');
const listAirport = document.querySelector('.searchAirport');


async function inputSearch(code) {
    let contentAirport = await fetch(`http://127.0.0.1:8000/api/airport?query=${code}`, {
        headers: 'GET'
    })
    let resAirport = await contentAirport.json();
    console.log(resAirport)
    return resAirport;
}




formSearch.addEventListener('click', (e) => {
    e.preventDefault();
})


