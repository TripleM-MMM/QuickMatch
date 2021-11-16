import './MatchesList.css'
import { Link } from 'react-router-dom';

function MatchesList( {matches} ) {
    return(
        <div className='matches-list'>
            {matches.map((match) => (
                <div className='match-preview' key={match.id}>
                    <Link to={`/matches/${match.id}`}>
                    <h2> { match.place } </h2>
                        <p>Cena: {match.price}</p>
                        <p>Data: {match.date.slice(0,10)}</p>
                        <p>Godzina : {match.date.slice(11,16)}</p>
                        <p>Cena: {match.price}</p>
                        <p>Data: {match.date.slice(0,10)}</p>
                        <p>{match.description}</p> 
                        <p> {match.signed_players}</p>
                        <p> {match.max_players } </p>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default MatchesList