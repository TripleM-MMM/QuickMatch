import './MatchesList.css'
import { Link } from 'react-router-dom';
import moment from 'moment';
import filterByProeperty from './filterByProperty'

function MatchesList( {matches} ) {
    matches = filterByProeperty(matches, 'date')
    console.log(matches)
    return(
        <div className='matches-list'>
            {matches.map((match) => (
                                    // {(() => {
                                    //     switch(moment().isAfter(match.date)) {
                                    //         case false: return <Link to={`/matches/${match.id}`}>
                                    //         <h2> { match.place } </h2>
                                    //             <div class="column">
                                    //                 <p>Cena: {match.price}</p>
                                    //                 <p>Data: {match.date.slice(0,10)}</p>
                                    //                 <p>Godzina : {match.date.slice(11,16)}</p>
                                    //             </div>
                                    //             <div class="column">
                                    //                 <p>Cena: {match.price}</p>
                                    //                 <p>Opis meczu: {match.description}</p> 
                                    //             </div>
                                    //             <div class="column" style={{backgroundColor: 'grey'}}>
                                    //                 <p>Liczba zapisanych: </p>
                                    //                 <p>{match.signed_players}/{match.max_players } </p>
                                    //             </div>
                                    //         </Link>;
                                    //         case true: return ;
                                    //     }
                                    //     })()}
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