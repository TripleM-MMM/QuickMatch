import { useParams } from "react-router-dom";
import useFetch from './useFetch';
import axios from 'axios';
import {useHistory } from 'react-router-dom';
import './MatchDetails.css'
import {useState} from 'react';
import Popup from './Popup';

const MatchDetails = () => {
    const [isOpen, setIsOpen] = useState(false)
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const [isOpen2, setIsOpen2] = useState(false)
    const togglePopup2 = () => {
        setIsOpen2(!isOpen2);
    }
    let isAuthorized = true;
    let isEntered = false;

    const {id} = useParams();
    const {data: match} = useFetch("/api/matches/"+ id  +"/");
    let organizer_id = match && match.organizer
    let pitch_id = match && match.pitch
    const {data: pitch} = useFetch("/api/pitches/" + pitch_id + "/");
    const {data: organizer} = useFetch("/api/users/" + organizer_id + "/");
    const history = useHistory();
    const match_id = id;
    const info = {match_id}

    const [isLogged, setIsLogged] = useState(localStorage.getItem('token') ? true : false)
    const [username, setUsername] = useState('')
    if (isLogged) {
        fetch('http://localhost:8000/core/current_user/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }
        })
          .then(res => res.json())
          .then(json => {
            setUsername(json.username)
          });
      }

    const handleDelete = () => {
        axios.post("/api/delete_match/", info, {headers: {
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
            history.push('/matches')
        })
    }

    const handleSign = () => {
        axios.post("/api/sign_for_match/", info, {headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
         }})
         .catch(function (error) {
            if (error.response) {
                console.log(isOpen)
                if (error.response.status == 403) {
                    isEntered = true;
                }
                else if (error.response.status == 401) {
                    isAuthorized = false;
                }
                console.log(isOpen)
              console.log(error.response.status);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log(error.status)
              console.log('Error', error.message);
            }
            console.log(error.config);
          })
        .then(res=>{
            if (isAuthorized && !isEntered) {
                history.push('/matches');
            } else if (isEntered){
                setIsOpen2(true);
            } else {
                setIsOpen(true);
            }
        })
    }

    return (
        <div className="match_details" >
            <div className="row1">
                <div className="column1">
                    <h1>Lokalizacja</h1>
                    <h2> { pitch && pitch.name } </h2>
                    <p>Adres: {pitch && pitch.address}</p>
                    <p>Kontakt: {pitch && pitch.contact}</p>
                    <img src={pitch && pitch.photo_url} alt="Pitch"/>
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
                {!(username == (organizer && organizer.username)) &&
                <button onClick={handleSign}>Dołącz do wydarzenia</button>}
                {(username == (organizer && organizer.username)) && <button onClick={handleDelete}>Usuń wydarzenie</button>}
            </div>
            {isOpen && <Popup
                content={<>
                    <b>Musisz być zalogowany !</b>
                    </>}
                    handleClose={togglePopup}
            />}
            {isOpen2 && <Popup
                content={<>
                    <b>Już dołączyłeś do tego wydarzenia !</b>
                    </>}
                    handleClose={togglePopup2}
            />}
        </div>
    )

}

export default MatchDetails;