import './MatchesList.css'

function MatchesList( {matches} ) {
    return(
        <div className='matches-list'>
            {matches.map((match) => (
                <div className='match-preview' key={match.id}>
                    <h2> { match.place } </h2>
                        <p>Cena {match.price}</p>
                </div>
            ))}
        </div>
    )
}

export default MatchesList