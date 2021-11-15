import './MatchesList.css'

function MatchesList( {matches} ) {
    return(
        <div className='matches-list'>
            {matches.map((match) => (
                <div className='match-preview' key={match.id}>
                    {/* <h2> { match.place } </h2>
                        <p>Cena: {match.price}</p>
                        <p>Data: {match.date.slice(0,10)}</p>
                        <p>Godzina : {match.date.slice(11,16)}</p> */}
                    <h2> { match.title } </h2>
                        {/* <p>Cena: {match.price}</p>
                        <p>Data: {match.date.slice(0,10)}</p> */}
                        {/* <p>{match.short_description}</p>  */}
                        {/* <p>{ match.date }</p> */}
                </div>
            ))}
        </div>
    )
}

export default MatchesList