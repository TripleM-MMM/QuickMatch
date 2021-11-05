import './Matches.css'
import MatchesList from './MatchesList';
import useFetch from './useFetch';

function Matches() {
    const {data: matches} = useFetch('http://localhost:8000/matches')

    return(
        <div className="matches">
            <h1>
                Mecze w twojej okolicy
            </h1>
            <div className="list">
            { matches && <MatchesList matches={matches} />}
            </div>
        </div>
    );
}

export default Matches