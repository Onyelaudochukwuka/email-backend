document.forms.addEventListener('submit', (e) => {
    e.preventDefault();
    const first_name = document.forms.first_name.value;
    const last_name = document.forms.last_name.value;
    const user_email = document.forms.email.value;
    const title = document.forms.title.value;
    const message = document.forms.message.value;
    const data = {
        my_email: "udochukwukaonyela@gmail.com",
        message,
        first_name,
        last_name,
        title,
        user_email

    };
    console.log(data);
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'no-cors'
    }
    var request = new Request('https://email-backend-production.up.railway.app/message/send');

    fetch(request, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
});