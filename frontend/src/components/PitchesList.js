import './MatchesList.css'

function PitchesList( {pitches} ) {
    return(
        <div className='matches-list'>
            {pitches.map((pitches) => (
                <div className='match-preview' key={pitches.id}>
                    <h2> { pitches.place } </h2>
                        <p>Adres: {pitches.adres}</p>
                </div>
            ))}
        </div>
    )
}

export default PitchesList