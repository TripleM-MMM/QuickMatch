import './Matches.css'
import PitchesList from './PitchesList';
import useFetch from './useFetch';

function Pitches() {
    const {data: pitches} = useFetch('http://localhost:8000/pitches')

    return(
        <div className="matches">
            <h1>
                Boiska w twojej okolicy
            </h1>
            <div className="list">
                { pitches && <PitchesList pitches={pitches} />}
            </div>
        </div>
    );
}

export default Pitches