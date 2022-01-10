import './Create.css'
import {useState} from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {useHistory } from 'react-router-dom'
import axios from 'axios';


function Create() {


    const [pitch, setPitch] = useState(5)
    const [price, setPrice] = useState('')
    const [organizer, setOrganizer] = useState(6)
    const [date, setDate] = useState(null)
    const [description, setDescription] = useState('')
    const [signed_players, setSigned_players] = useState('0')
    const [max_players, setMax_players] = useState('1')

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        const match = {pitch, price, organizer, date, description, signed_players, max_players};
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
            </form>
        </div>
    );
}
 
export default Create;