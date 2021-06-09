import React, { useEffect, useState } from "react";
import axios from "axios";
import {card, stripe} from "./testStripe";

const Form =() => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [customer, setCustomer] = useState([])
  const [users, setUsers] = useState(undefined)
  const [basic, setBasisc] = useState(false);
  const [premium, setPremium] = useState(false);
  const [month, setMonth] = useState(false);
  const [year, setYear] = useState(false);

  const selectBasic = e => {
    e.preventDefault();
    setBasisc(!basic);
    setPremium(false);
  }
  const selectPremium = e => {
    e.preventDefault();
    setPremium(!premium);
    setBasisc(false);
  }
  const selectMonth = e => {
    e.preventDefault();
    setMonth(!month);
    setYear(false);
  }
  const selectYear = e => {
    e.preventDefault();
    setYear(!year);
    setMonth(false);
  }
  const submitHandler= async (e) =>{
    e.preventDefault();
    const user = customer.find(user => user.name === name)
    const customerId = user.id;
    try{
      const result = await stripe.createPaymentMethod({
        type: 'card',
        card: card,
        billing_details: {
          name
        }
      })
      console.log(result)
 
    const plan = basic ?   "basic" :  "premium";
    const subType = month ? "month" : "year";

    const postData = await axios.post(`${process.env.PostPayment}/${plan}`,{
      type: subType,
      paymentMethodId: result.paymentMethod.id,
      customer_id: customerId,
      unit: users
    })
      console.log("success", postData)
    }
    catch(e){
      console.log(e)
    }
  }

  const getCostomer = async () => {
    try{
      const result = await axios.get(`${process.env.PostPayment}/coustmer`)
      setCustomer(result.data.data)
      console.log(result)
    }
    catch(e){
      console.error(e);
    }
  }
  useEffect(() => {
    getCostomer()
    card.mount("#example1-card")
  }, [])
  return(
    <>
    <div>
      <label htmlFor="bassic" className="elements_examples.form.email_label" >Basic</label>
      <input type="checkbox" name="test" id="" onChange={e =>selectBasic(e)}/>
    </div>
    <div>
      <label htmlFor="bassic" className="elements_examples.form.email_label" >Premium</label>
      <input type="checkbox" name="test" id="" onChange={e =>selectPremium(e)}/>
    </div>
    <div>
      <label htmlFor="bassic" className="elements_examples.form.email_label" >月契約</label>
      <input type="checkbox" name="test" id="" onChange={e =>selectMonth(e)}/>
    </div>
    <div>
      <label htmlFor="bassic" className="elements_examples.form.email_label" >年間契約</label>
      <input type="checkbox" name="test" id="" onChange={e =>selectYear(e)}/>
    </div>
    <div className="cell example example1" id="example-1">
    <form onSubmit={submitHandler}>
      <fieldset>
        <div className="row">
          <label htmlFor="example1-name" data-tid="elements_examples.form.name_label">Name</label>
          <input 
            id="example1-name" 
            data-tid="elements_examples.form.name_placeholder" 
            type="text" 
            placeholder="Jane Doe" 
            required="" 
            autoComplete="name" 
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="row">
          <label htmlFor="example1-email" data-tid="elements_examples.form.email_label">Email</label>
          <input 
            id="example1-email" 
            data-tid="elements_examples.form.email_placeholder" 
            type="email" 
            placeholder="janedoe@gmail.com" 
            required="" 
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}            
          />
        </div>
        <div className="row">
          <label htmlFor="example1-phone" data-tid="elements_examples.form.phone_label">Phone</label>
          <input 
            id="example1-phone" 
            data-tid="elements_examples.form.phone_placeholder" 
            type="tel" 
            placeholder="(941) 555-0123" 
            required="" 
            autoComplete="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}     
          />
        </div>
        <div className="row">
          <label htmlFor="example1-phone" data-tid="elements_examples.form.phone_label">人数</label>
          <input 
            id="example1-phone" 
            data-tid="elements_examples.form.phone_placeholder" 
            type="text" 
            placeholder="42" 
            required="" 
            autoComplete="tel"
            value={users}
            onChange={e => setUsers(Number(e.target.value))}     
          />
        </div>        
      </fieldset>
      <fieldset>
        <div className="row">
          <div id="example1-card"></div>
        </div>
      </fieldset>
      <div>
      </div>
      <button 
        type="submit" 
        data-tid="elements_examples.form.pay_button"
      >
        Submit
      </button>
    </form>
    </div>
    </>
  )
}

export default Form
