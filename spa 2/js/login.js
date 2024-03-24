let loginForm = document.querySelector('#login-form');


// обработка формы логина
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    let formData = new FormData(loginForm);
    
    let phone = formData.get('phone');
    let password = formData.get('password');

    let responseLogin = await fetch(`${url}login`, {
        method: "POST" ,
        headers: {"Content-Type" :"application/json"} ,
        body: JSON.stringify({phone , password})
    })
    let contentLogin = await responseLogin.json()
    console.log(contentLogin)

    localStorage.setItem('AuthToken' , contentLogin.data.token);
})



if(localStorage.getItem('AuthToken') == 'null'){
    
}