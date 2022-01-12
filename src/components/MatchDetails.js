import { useParams } from "react-router-dom";
import useFetch from './useFetch';
import axios from 'axios';
import {useHistory } from 'react-router-dom';
import './MatchDetails.css'

const MatchDetails = () => {
    const { id } = useParams();
    const {data: match} = useFetch("/api/matches/"+id);
    const {data: pitch} = useFetch("/api/pitches/" + 5);
    const history = useHistory();

    const handleDelete = () => {
        axios.post("/api/delete_match/", {id}, {headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
         }})
        .then(res=>{
            history.push('/matches')})
    }

    return (
        <div className="match_details" >
            <div className="row1">
                <div className="column1">
                    <h1>Lokalizacja</h1>
                    <h2> { pitch && pitch.name } </h2>
                    <p>Adres: {pitch && pitch.address}</p>
                    <p>Kontakt: {pitch && pitch.contact}</p>
                </div>
                <div className="column1">
                    <h1>Informacja o wydarzeniu</h1>
                    <p>{match && match.description}</p>
                    <p>Data: {match && match.date.slice(0,10)}</p>
                    <p>Godzina : {match && match.date.slice(11,16)}</p>
                    <p>Liczba uczestników: {match && match.signed_players}/{match && match.max_players}</p>
                    <p>Organizator: {match && match.organizer}</p>
                </div>
            </div>
            <button onClick={handleDelete}>Dołącz do wydarzenia</button>
            <button onClick={handleDelete}>Usuń wydarzenie</button>
        </div>
    )

}

export default MatchDetails;