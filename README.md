## Portfolio Sender

 This is a simple that sends entry to the entered email.

### Usage Guide
    
    The API is hosted on Railway: https://email-backend-production.up.railway.app/

#### Send email
    /message/send
    method: POST

### Payload
- my_email: Email user entry will be sent to
- message: Message from the user
- first_name: First name of the user
- last_name: Last name of the user
- user_email: Email of the user

#### Javascript 
```bash
const options = {
  method: 'POST',
  body: JSON.stringify({
    my_email: "My Personal Email",
    message: "Message from user on your portfolio",
    first_name: "user's first name",
    last_name: "user's last name",
    title: "Title of user's message",
    user_email: "user's email address"
    }),
};

fetch('https://email-backend-production.up.railway.app/message/send', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
```
 
#### Python

```bash

import requests

url = "https://email-backend-production.up.railway.app/message/send"

payload = {
    "my_email": "My Personal Email",
    "message": "Message from user on your portfolio",
    "first_name": "user's first name",
    "last_name": "user's last name",
    "title": "Title of user's message",
    "user_email": "user's email address"
}
response = requests.request("POST", url, json=payload)

print(response.text)

```


