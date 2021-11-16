import { useParams } from "react-router-dom";
import useFetch from './useFetch';
import axios from 'axios';
import {useHistory } from 'react-router-dom';

const MatchDetails = () => {
    const { id } = useParams();
    const {data: matches} = useFetch("/api/matches/" + id);
    const history = useHistory();

    const handleDelete = () => {
        axios.delete("/api/matches/"+id)
        .then(res=>{
            history.push('/matches')})
    }

    return (
        <button onClick={handleDelete}>Usuń wydarzenie</button>
    )

}

export default MatchDetails;