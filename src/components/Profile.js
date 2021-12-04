import './Profile.css' //
import {useState} from 'react';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {useHistory } from 'react-router-dom'
import axios from 'axios';


function Profile() {
    const [email, setMailLogin] = useState('')
    const [username, setUsername] = useState('')
    const [first_name, setName] = useState('')
    const [last_name, setLastName] = useState('')
    const [password, setPassword] = useState('')

    const [user_matches, setUserMatches] = useState('')

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {username, first_name, last_name, email, password, user_matches};  

        axios.post("/api/users/", user)  
        .then(res=>{
            console.log(res);
            history.go(-1)})
    }

    return (


        <div className="profile"> 

<           div className="img">
                <img src="/static/stadium.jpg"/>
            </div> 

            <h2>Edytuj profil</h2>
            <form onSubmit={handleSubmit}>

                <label>Nazwa użytkownika: </label>
                <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>Imie: </label>
                <input
                    type="text"
                    required
                    value={first_name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Nazwisko: </label>
                <input
                    type="text"
                    required
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label>Hasło: </label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button>Zapisz</button>
            </form>


        </div>
    );
}
 
export default Profile;  