import { useParams } from "react-router-dom";
import useFetch from './useFetch';
import axios from 'axios';
import {useHistory } from 'react-router-dom';
import './MatchDetails.css'

const MatchDetails = () => {
    const {id} = useParams();
    const {data: match} = useFetch("/api/matches/"+ id  +"/");
    let organizer_id = match && match.organizer
    let pitch_id = match && match.pitch
    const {data: pitch} = useFetch("/api/pitches/" + pitch_id + "/");
    const {data: organizer} = useFetch("/api/users/" + organizer_id + "/");
    const history = useHistory();
    const match_id = id;
    const info = {match_id}

    const handleDelete = () => {
        axios.post("/api/delete_match/", info, {headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
         }})
        .then(res=>{
            history.push('/matches')})
    }

    const handleSign = () => {
        axios.post("/api/sign_for_match/", info, {headers: {
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
                    <img 
                        src={pitch && pitch.photo_url}
                        alt="new"
                    />
                </div>
                <div className="column1">
                    <h1>Informacja o wydarzeniu</h1>
                    <p>{match && match.description}</p>
                    <p>Data: {match && match.date.slice(0,10)}</p>
                    <p>Godzina : {match && match.date.slice(11,16)}</p>
                    <p>Liczba uczestników: {match && match.signed_players}/{match && match.max_players}</p>
                    <p>Organizator: {organizer && organizer.firs_name} {organizer && organizer.last_name} ({organizer && organizer.username})</p>
                </div>
            </div>
            <div className="buttons">
                <button onClick={handleSign}>Dołącz do wydarzenia</button>
                <button onClick={handleDelete}>Usuń wydarzenie</button>
            </div>
        </div>
    )

}

export default MatchDetails;