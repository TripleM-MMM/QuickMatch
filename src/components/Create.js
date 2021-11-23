import './Create.css'
import {useState} from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {useHistory } from 'react-router-dom'
import axios from 'axios';


function Create() {
    const [pitch_id, setPlace] = useState('MS AGH')
    const [price, setPrice] = useState('')
    const [organizer, setOrganizer] = useState('Jan abab')
    const [date, setDate] = useState(null)
    const [description, setDescription] = useState('')
    const [signed_players, setSigned_players] = useState('0')
    const [max_players, setMax_players] = useState('1')

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        const match = {pitch_id, price, organizer, date, description, signed_players, max_players};

    // fetch('http://localhost:8000/matches',  {
    //     method: 'POST',
    //     headers: { "Content-type": "application/json"},
    //     body: JSON.stringify(match) 
    // }).then( () => {
    //     console.log('new match added');
    //     history.go(-1);
    // })


        axios.post("/api/matches/", match)
        .then(res=>{
            console.log(res);
            history.go(-1)})
    
    }

    return (
        <div className="create">
            <h2>Dodaj nowy mecz</h2>
            <form onSubmit={handleSubmit}>
                <label>Miejsce: </label>
                <select
                    required
                    value={pitch_id}
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
            </form>
        </div>
    );
}
 
export default Create;