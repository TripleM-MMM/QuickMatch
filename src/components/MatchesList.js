import './MatchesList.css'
import { Link } from 'react-router-dom';

function MatchesList( {matches} ) {
    return(
        <div className='matches-list'>
            {matches.map((match) => (
                <div className='match-preview' key={match.id}>
                    <Link to={`/matches/${match.id}`}>
                    <h2> { match.place } </h2>
                        <div class="column">
                            <p>Cena: {match.price}</p>
                            <p>Data: {match.date.slice(0,10)}</p>
                            <p>Godzina : {match.date.slice(11,16)}</p>
                        </div>
                        <div class="column">
                            <p>Cena: {match.price}</p>
                            <p>Opis meczu: {match.description}</p> 
                        </div>
                        <div class="column" style={{backgroundColor: 'grey'}}>
                            <p>Liczba zapisanych: </p>
                            <p>{match.signed_players}/{match.max_players } </p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default MatchesList