let listTextUser = document.querySelector('.textUser');

let token = localStorage.getItem('AuthToken')

// Получение данных юзера через токен , который сохраняется в localstorage 
async function userContent() {
    let responseUser = await fetch(`${url}user`, {
        method: "GET",
        headers:
        {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    let contentToken = await responseUser.json();

    listTextUser.innerHTML = ` 
    <h2 class="mb-4">
    Привет,
    <span class="test-3-name">${contentToken.first_name}</span>
    <span class="test-3-last">${contentToken.last_name}</span>
    <a class="btn btn-sm btn-secondary test-3-logout" onclick="replaceWindow('mainPage')">Выйти</a>
</h2>
    
    `
}

userContent();



