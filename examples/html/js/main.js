const helpers = {};
helpers.getElement = (element) => document.querySelector(`[data-element="${element}"]`);
const successPopup = helpers.getElement("success-popup");
const closeSuccessPopup = helpers.getElement("close-success-popup");
const errorPopup = helpers.getElement("error-popup");
const closeErrorPopup = helpers.getElement("close-error-popup");
closeSuccessPopup.addEventListener("click", () => {
  successPopup.classList.remove("active");
});
closeErrorPopup.addEventListener("click", () => {
  errorPopup.classList.remove("active");
});
document.forms.addEventListener("submit", (e) => {
  e.preventDefault();
  const first_name = document.forms.first_name.value;
  const last_name = document.forms.last_name.value;
  const user_email = document.forms.user_email.value;
  const title = document.forms.title.value;
  const message = document.forms.message.value;
  const data = {
    my_email: "udochukwukaonyela@gmail.com",
    message,
    first_name,
    last_name,
    title,
    user_email,
  };
  console.log(data);
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
  var request = new Request(
    "https://email-backend-production.up.railway.app/message/send"
  );

  fetch(request, options)
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        successPopup.classList.add("active");
      } else {
        errorPopup.classList.add("active");
      }
    })
    .catch((err) => console.log(err));
});
