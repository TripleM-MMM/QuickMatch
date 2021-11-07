import './Create.css'
import {useState} from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {useHistory } from 'react-router-dom'


function Create() {
const [place, setPlace] = useState('MS AGH')
const [price, setPrice] = useState('')
const [organizer, setOrganizer] = useState('Jan abab')
const [number, setNumber] = useState('')
const [date, setDate] = useState(null)

const history = useHistory()

const handleSubmit = (e) => {
    e.preventDefault();
    const match = {place, price, organizer, date};

    fetch('http://localhost:8000/matches',  {
        method: 'POST',
        headers: { "Content-type": "application/json"},
        body: JSON.stringify(match) 
    }).then( () => {
        console.log('new match added');
        history.go(-1);
    })
}

    return (
        <div className="create">
            <h2>Dodaj nowy mecz</h2>
            <form onSubmit={handleSubmit}>
                <label>Miejsce: </label>
                <select
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
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
                    selected={date} 
                    onChange={(date) => setDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                />
                <label>Liczba osób: </label>
                <input
                    type="text"
                    required
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />
                <button>Dodaj wydarzenie</button>
            </form>
        </div>
    );
}
 
export default Create;