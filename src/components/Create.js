import './Create.css'
import {useState} from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {useHistory } from 'react-router-dom'
import axios from 'axios';
import Popup from './Popup';
import NumericInput from 'react-numeric-input';
import useFetch from './useFetch';


function Create() {
    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      history.go(-1)
    }
    
    const [pitch, setPitch] = useState(3)
    const [price, setPrice] = useState('0')
    const [date, setDate] = useState(null)
    const [description, setDescription] = useState('')
    const [max_players, setMax_players] = useState('0')
    const [isLogged, setIsLogged] = useState(localStorage.getItem('token') ? true : false)

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        const match = {pitch, price, date, description, max_players};
        axios.post("/api/create_match/", match, {headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
         }})
        .catch(function (error) {
            if (error.response) {
              console.log(error.response.status);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          })
        .then(res=>{
            history.go(-1)
        })
    }

    const {data: pitches} = useFetch("/api/pitches/");
    
    return (
        <div className="create">
            <h2>Dodaj nowy mecz</h2>
            <form onSubmit={handleSubmit}>
                <label>Miejsce: </label>
                <select
                    required
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                >
                    {pitches && pitches.map((pitch_) => (
                        <option value={pitch_.id}>{pitch_.name}</option>
                    ))}
                    {/* // <option value="MS AGH">MS AGH</option>
                    // <option value="COM COM">COM COM</option> */}
                </select>
                <label>Cena: </label>
                <NumericInput className='form-control'
                    required
                    strict
                    mobile
                    step={ 0.1 }
                    min={ 0.1 } 
                    onChange={(value) => setPrice(value)}
                />
                <label>Data: </label>
                <DatePicker 
                    required
                    selected={date} 
                    onChange={(date) => setDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                />
                <label>Opis: </label>
                <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label>Liczba osób: </label>
                <NumericInput className='form-control'
                    required
                    strict
                    mobile
                    min={ 2 } 
                    onChange={(value) => setMax_players(value)}
                />
                <label></label>
                <button className='add'>Dodaj wydarzenie</button>
                {!isLogged && <Popup
                content={<>
                    <b>Musisz być zalogowany !</b>
                    </>}
                    handleClose={togglePopup}
                />}
            </form>
        </div>
    );
}
 
export default Create;