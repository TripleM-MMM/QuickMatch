
import { Link } from 'react-router-dom';
import './Matches.css'
import MatchesList from './MatchesList';
import useFetch from './useFetch';

function Matches() {
    const {data: matches } = useFetch("/api/matches/")

    return(
        <div className="all">
            <div className="menu">
                <Link to='/create_match'>Dodaj wydarzenie</Link>
            </div>
            <div className="matches">
                <h1>
                    Mecze w twojej okolicy
                </h1>
                <div className="list">
                { matches && <MatchesList matches={matches} />}
                </div>
            </div>
        </div>
    );
}

export default Matches