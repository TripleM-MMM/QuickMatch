import './Contact.css'
import {useState} from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {useHistory } from 'react-router-dom'
import axios from 'axios';


function Contact() {
    return (
        <div className="background">
            <img src="/static/main_background.jpg"/>
        </div>
    );
}
 
export default Contact;