import React, { useEffect } from 'react';
import {stripe, registerElements}  from "./stripe"

const App = () => {
  useEffect(() => {
    var elements = stripe.elements({
      fonts: [
        {
          cssSrc: 'https://fonts.googleapis.com/css?family=Source+Code+Pro',
        },
      ],
      // Stripe's examples are localized to specific languages, but if
      // you wish to have Elements automatically detect your user's locale,
      // use `locale: 'auto'` instead.
      locale: window.__exampleLocale
    });
  
    // Floating labels
    var inputs = document.querySelectorAll('.cell.example.example2 .input');
    Array.prototype.forEach.call(inputs, function(input) {
      input.addEventListener('focus', function() {
        input.classList.add('focused');
      });
      input.addEventListener('blur', function() {
        input.classList.remove('focused');
      });
      input.addEventListener('keyup', function() {
        if (input.value.length === 0) {
          input.classList.add('empty');
        } else {
          input.classList.remove('empty');
        }
      });
    });
  
    var elementStyles = {
      base: {
        color: '#32325D',
        fontWeight: 500,
        fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
  
        '::placeholder': {
          color: '#CFD7DF',
        },
        ':-webkit-autofill': {
          color: '#e39f48',
        },
      },
      invalid: {
        color: '#E25950',
  
        '::placeholder': {
          color: '#FFCCA5',
        },
      },
    };
  
    var elementClasses = {
      focus: 'focused',
      empty: 'empty',
      invalid: 'invalid',
    };
  
    var cardNumber = elements.create('cardNumber', {
      style: elementStyles,
      classes: elementClasses,
    });
    cardNumber.mount('#example2-card-number');
  
    var cardExpiry = elements.create('cardExpiry', {
      style: elementStyles,
      classes: elementClasses,
    });
    cardExpiry.mount('#example2-card-expiry');
  
    var cardCvc = elements.create('cardCvc', {
      style: elementStyles,
      classes: elementClasses,
    });
    cardCvc.mount('#example2-card-cvc');
  
    registerElements([cardNumber, cardExpiry, cardCvc], 'example2');
  }, [])
  return (
    <div className="cell example example2" id="example-2">
    <form>
      <div data-locale-reversible>
        <div className="row">
          <div className="field">
            <input id="example2-address" data-tid="elements_examples.form.address_placeholder" className="input empty" type="text" placeholder="185 Berry St" required="" autoComplete="address-line1" />
            <label htmlFor="example2-address" data-tid="elements_examples.form.address_label">Address</label>
            <div className="baseline"></div>
          </div>
        </div>
        <div className="row" data-locale-reversible>
          <div className="field half-width">
            <input id="example2-city" data-tid="elements_examples.form.city_placeholder" className="input empty" type="text" placeholder="San Francisco" required="" autoComplete="address-level2" />
            <label htmlFor="example2-city" data-tid="elements_examples.form.city_label">City</label>
            <div className="baseline"></div>
          </div>
          <div className="field quarter-width">
            <input id="example2-state" data-tid="elements_examples.form.state_placeholder" className="input empty" type="text" placeholder="CA" required="" autoComplete="address-level1" />
            <label htmlFor="example2-state" data-tid="elements_examples.form.state_label">State</label>
            <div className="baseline"></div>
          </div>
          <div className="field quarter-width">
            <input id="example2-zip" data-tid="elements_examples.form.postal_code_placeholder" className="input empty" type="text" placeholder="94107" required="" autoComplete="postal-code" />
            <label htmlFor="example2-zip" data-tid="elements_examples.form.postal_code_label">ZIP</label>
            <div className="baseline"></div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="field">
          <div id="example2-card-number" className="input empty"></div>
          <label htmlFor="example2-card-number" data-tid="elements_examples.form.card_number_label">Card number</label>
          <div className="baseline"></div>
        </div>
      </div>
      <div className="row">
        <div className="field half-width">
          <div id="example2-card-expiry" className="input empty"></div>
          <label htmlFor="example2-card-expiry" data-tid="elements_examples.form.card_expiry_label">Expiration</label>
          <div className="baseline"></div>
        </div>
        <div className="field half-width">
          <div id="example2-card-cvc" className="input empty"></div>
          <label htmlFor="example2-card-cvc" data-tid="elements_examples.form.card_cvc_label">CVC</label>
          <div className="baseline"></div>
        </div>
      </div>
    <button type="submit" data-tid="elements_examples.form.pay_button">Pay $25</button>
      <div className="error" role="alert"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
          <path className="base" fill="#000" d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"></path>
          <path className="glyph" fill="#FFF" d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"></path>
        </svg>
        <span className="message"></span></div>
    </form>
  </div>
  );
};
export default App;
