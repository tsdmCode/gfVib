const backgrounds = [
  '/assets/_FILES/images/slider1.jpg',
  '/assets/_FILES/images/slider2.jpg',
  '/assets/_FILES/images/slider3.jpg',
];

//preloader mine billeder så jeg undgår hvide flashes
//virker ikke?
backgrounds.forEach((src) => {
  const img = new Image();
  img.src = src;
});

const form = document.getElementById('subscribeform');
const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
const noSpecialSignsRegex = new RegExp(/[!@$%^&*(),?":{}|<>]/);
const header = document.getElementById('global-header');

let currentIndex = 0;

setInterval(() => {
  if (currentIndex == backgrounds.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  header.style.backgroundImage = `url(${backgrounds[currentIndex]})`;
}, 5000);

let hasErrors = false;

function submitForm(event) {
  event.preventDefault();
  clearErrors();

  const fullName = event.target.fullname;
  const email = event.target.email;

  if (fullName.value.length < 2) {
    setErrorMessage(fullName, 'Fornavn skal være på mere end et bogstav');
  } else if (noSpecialSignsRegex.test(fullName.value)) {
    setErrorMessage(fullName, 'Dit navn er for mærkeligt, DUDE!');
  }

  if (!emailRegex.test(email.value)) {
    setErrorMessage(email, 'Indtast en gyldig e-mail!');
  }

  if (!hasErrors) {
    alert('Tillykke du har indsendt formen');
  }
}

function setErrorMessage(target, message) {
  hasErrors = true;
  let errorMessage = document.createElement('b');
  errorMessage.classList.add('error');
  errorMessage.innerText = message;
  target.after(errorMessage);
}

function clearErrors() {
  hasErrors = false;
  let errors = document.querySelectorAll('b');
  errors.forEach((el) => {
    el.remove();
  });
}

form.addEventListener('submit', submitForm);
