import './PitchesList.css'

function PitchesList( {pitches} ) {
    return(
        <div className='pitches-list'>
            {pitches.map((pitches) => (
                <div className='pitch-preview' key={pitches.id}>
                    <h2> { pitches.name } </h2>
                        <img src={pitches.photo_url} align="left"/>
                        <div className="info">
                            <p>Adres: {pitches.address}</p>
                            <p>Kontakt: {pitches.contact}</p>
                        </div>
                </div>
            ))}
        </div>
    )
}

export default PitchesList