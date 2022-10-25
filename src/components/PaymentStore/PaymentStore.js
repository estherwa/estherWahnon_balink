import React, {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";
import axios from "axios";
import * as countries from "i18n-iso-countries";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import './style.css'
import {order} from '../orders'
import {REACT_APP_URL} from "../../config/env";
const Checkbox = ({ label, value, onChange }) => {
    return (
        <label>
            <input type="checkbox" checked={value} onChange={onChange} />
            {label}
        </label>
    );
};
Checkbox.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.bool
};
export default function PaymentStore() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [otherCondition, setOtherCondition] = useState(false);
    const [otherConditionsText, setOtherConditionsText] = useState("");
    const [numberPhone, setPhoneNumber] = useState("")
    countries.registerLocale(enLocale);
    countries.registerLocale(itLocale);
    const [saveBook] = useState([]);
    const FirstName = ()=>{
        return   <input className="firstName"  type="text" id="first_name"
                        value={firstName} onChange={(e)=>setFirstName(e.target.value)}
                        maxLength={10}
                        minLength={2}
                        name="FirstName" placeholder="First Name" required/>
    }
    const LastName = ()=>{
        return   <input className="lastName"  type="text" id="lastname"
                        value={lastName} onChange={(e)=>setLastName(e.target.value)}
                        name="Lastname" placeholder="Last Name"  maxLength={10} required/>
    }
    const Zip =()=>{
        return  <input className="zip" type="number" step="any"
                       pattern="[0-9]+"
                       value={zipCode} onChange={(e)=>setZipCode(e.target.value)}
                       minLength={5}
                       name="ZipCode" placeholder="Zip Code" />
    }
    const PhoneNumber =()=>{
        return <input className="phoneNumber" type="text" step="any"
                      name= "numberPhone" id="numberPhone"
                      pattern="[0-9]+"
                      value={numberPhone} onChange={(e)=>setPhoneNumber(e.target.value)}
                      placeholder="Number phone" required/>
    }
    const CheckBox =()=>{
        return <Checkbox
            className="checkBox"  value={otherCondition} onChange={(e)=>setOtherCondition(e.target.checked)}
            label=" Any comments"
            name="otherConditions"
        />
    }
    const Check_box = ()=>{
        return <input className="check_box" type="text" id="check_box" name="Other conditions"
                        placeholder="Any comments" value={otherConditionsText} onChange={(e)=>setOtherConditionsText(e.target.value)}
                        disabled={!otherCondition} />
    }
    useEffect(()=>{
        const insertOrders= async () => {
            const result = await axios.post(REACT_APP_URL,{
                query:{order}
                ,variables:{
                    "amount": null,
                    "books": null,
                    "firstName": firstName,
                    "lastName": lastName,
                    "address":zipCode,
                    "phone_number":numberPhone
                    }
            });
           saveBook(result.data.data.order.Insert_orders);
           console.log(result.data.data.order.Insert_orders)
        }
        insertOrders();
    },[])
    let navigate = useNavigate();
    const routeChange = () =>{
        navigate("/thankPage");
    }
    return (
        <>
            <p style={{textAlign: "center"}}>
                <div className="container-fluid" >
                    <div className="main">
                        <div className="row">
                            <div className="space">
                            <form>
                                <img src="../images/payment.jpg" width="500px" className="img-fluid" alt="logo"/>
                                <FirstName/>
                                <LastName/>
                                <Zip/>
                                <PhoneNumber/>
                                <CheckBox/>
                               <div className="space"></div>
                                <Check_box/>
                                <div className="space"></div>
                                <button style={{textAlign: "center"}}  onClick={(routeChange)} type="submit" className="mainButton">Submit</button>
                            </form>
                        </div>
                    </div>
                    </div>
                </div>
            </p>
 </>
    )
}

