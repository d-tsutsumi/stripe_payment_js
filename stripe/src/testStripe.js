/* eslint-disable no-undef */

export const stripe = Stripe('pk_test_51IHK8UL12xmXKIrMHoxVBMp4qpgk30ssBXvTrjFPZ6CsffnDgKL2I3Bb31ezPeQPj8rJwOdKwimfJ8qFeer1IP5I00ddiFvqBY');
const elements = stripe.elements()
const style = {
  base: {
    iconColor: '#c4f0ff',
    fontWeight: '500',
    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    fontSize: '16px',
    fontSmoothing: 'antialiased',
  },
  invalid: {
    iconColor: '#FFC7EE',
    color: '#FFC7EE',
  },
}


const card = elements.create('card', {style: style});


// validate
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

export { card };
