let registerForm = document.querySelector('#register-form');
console.log(localStorage.getItem('code'))

// обработка формы регистрации
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    let formData = new FormData(registerForm);

    let first_name = formData.get('first_name');
    let last_name = formData.get('last_name');
    let phone = formData.get('phone');
    let document_number = formData.get('document_number');
    let password = formData.get('password');

    fetch(`${url}/api/register`, {
        method: "POST" ,
        headers: {"Content-Type" :"application/json"} ,
        body: JSON.stringify({first_name , last_name , phone , document_number , password})
    })
    .then(response => console.log(response))
})