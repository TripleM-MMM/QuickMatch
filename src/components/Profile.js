import './Profile.css' //
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {useHistory } from 'react-router-dom'
import axios from 'axios';
import Popup from './Popup';
import useFetch from './useFetch';
import useFetchAuthorized from './useFetchAuthorized';


const Profile = () => {
    const {data: info} = useFetchAuthorized("/api/user_profile/");
    let username = info && info.username;

    let user_matches = info && info.user_matches

    var listOfMatches = []

    const {data: matches} = useFetch("/api/matches/?format=json");
    if (matches != null && user_matches != null) {
        for (let i=0; i < matches.length; i++) {
            if (user_matches.includes(matches[i].id)) {
                console.log(matches[i].id)
                listOfMatches.push(matches[i])
            }
          }
    }
    console.log(listOfMatches)

    const myJSON = JSON.stringify(matches);

    console.log(myJSON[0])

    const [isLogged, setIsLogged] = useState(localStorage.getItem('token') ? true : false)
    const togglePopup = () => {
        history.go(-1)
    }

    const history = useHistory()

    const [email, setemail] = useState(info && info.email)
    const [first_name, setName] = useState(info && info.first_name)
    const [last_name, setLastName] = useState(info && info.last_name)
    const [password, setPassword] = useState(info && info.password)
    const [confirm_password, setConfirm] = useState()
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {first_name, last_name, email, password, confirm_password};  
        console.log(user);
        axios.post("/api/edit_user_profile/", user, {headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
         }})  
        .then(res=>{
            console.log(user);
            window.location.reload(false)})
    }

    const handleDelete = (event) => {
        const match_id = event.target.getAttribute('data-arg1');
        const info = {match_id};
        axios.post("/api/sign_out_from_match/", info, {headers: {
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
            console.log(info)
            window.location.reload(false);
        })
    }

    return (
        <div className="profile"> 
            <div className="img">
                <img src="/static/stadium.jpg"/>
            </div> 
            <div className='info'>
                <h2 className='header'>Profil</h2>
                    <p>Nazwa użytkownika: {info && info.username}</p>
                    <p>Imię: {info && info.first_name}</p>
                    <p>Nazwisko: {info && info.last_name}</p>
                    <p>email: {info && info.email}</p>
                    <h3>Mecze</h3>
                    {listOfMatches.map((match) => (
                <div className='match-preview' key={match.id}>
                    <button className='match-date' onClick={handleDelete} data-arg1={match.id}> Data: {match.date.slice(0,10)} Godzina : {match.date.slice(11,16)} - ZREZYGNUJ</button>
                </div>
            ))}
            </div>
            <h2 className='edit'>Edytuj profil</h2>
            <form onSubmit={handleSubmit}>
                <label>email: </label>
                <input
                    type="text"
                    
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                />
                <label>Imie: </label>
                <input
                    type="text"
                    
                    value={first_name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label>Nazwisko: </label>
                <input
                    type="text"
                    
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label>Hasło: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>Potwierdź hasło: </label>
                <input
                    type="password"
                    value={confirm_password}
                    onChange={(e) => setConfirm(e.target.value)}
                />

                <button className='save'>Zapisz</button>
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
 
export default Profile;  