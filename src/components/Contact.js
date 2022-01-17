import './Contact.css'
import 'react-datepicker/dist/react-datepicker.css'

function Contact() {
    return (
        <div className='contact'>
            <div className="background">
                <img src="/static/main_background.jpg" alt='footbal_pitch'/>
            </div>
            <div classname="information">
                <p>Jeśli chcesz dodać boisko, napisz do nas:</p>
                <p>mail: retajczyk@student.agh.edu.pl</p>
            </div>
        </div>
    );
}
 
export default Contact;