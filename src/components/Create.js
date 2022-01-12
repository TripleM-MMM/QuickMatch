import './Create.css'
import {useState} from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {useHistory } from 'react-router-dom'
import axios from 'axios';
import Popup from './Popup';


function Create() {
    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      history.go(-1)
    }
    
    const [pitch, setPitch] = useState(5)
    const [price, setPrice] = useState('')
    const [date, setDate] = useState(null)
    const [description, setDescription] = useState('')
    const [max_players, setMax_players] = useState('1')
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
    
    return (
        <div className="create">
            <h2>Dodaj nowy mecz</h2>
            <form onSubmit={handleSubmit}>
                <label>Miejsce: </label>
                <select
                    required
                    value={pitch}
                    onChange={(e) => setPitch()}
                >
                    <option value="MS AGH">MS AGH</option>
                    <option value="COM COM">COM COM</option>
                </select>
                <label>Cena: </label>
                <input
                    type="text"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
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
                <input
                    type="text"
                    required
                    value={max_players}
                    onChange={(e) => setMax_players(e.target.value)}
                />
                <button>Dodaj wydarzenie</button>
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