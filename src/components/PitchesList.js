import './MatchesList.css'

function PitchesList( {pitches} ) {
    return(
        <div className='pitches-list'>
            {pitches.map((pitches) => (
                <div className='pitch-preview' key={pitches.id}>
                    <h2> { pitches.name } </h2>
                        <p>Adres: {pitches.address}</p>
                        <p>Kontakt: {pitches.contact}</p>
                </div>
            ))}
        </div>
    )
}

export default PitchesList