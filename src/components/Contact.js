import './Contact.css'
import {useState} from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {useHistory } from 'react-router-dom'
import axios from 'axios';


function Contact() {
    return (
        <div className='contact'>
            <div className="background">
                <img src="/static/main_background.jpg"/>
            </div>
            <div classname="information">
                <p>Jeśli chcesz dodać boisko, napisz do nas:</p>
                <p>mail: retajczyk@student.agh.edu.pl</p>
            </div>
        </div>
    );
}
 
export default Contact;