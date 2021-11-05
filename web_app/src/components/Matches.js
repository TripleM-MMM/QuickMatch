import './Matches.css'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'

function Matches() {
    const [matches, setmatches] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8000/matches')
            .then(res=>{
                return res.json();
            })
            .then(data=> {
                setmatches(data);
            })
    }, [])

    return(
        <div className="matches">
            <h1>
                Mecze w twojej okolicy
            </h1>
            
        </div>
    );
}

export default Matches