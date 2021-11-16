import { useParams } from "react-router-dom";
import useFetch from './useFetch';

const MatchDetails = () => {
    const { id } = useParams();
    const {data: matches} = useFetch("/api/matches/" + id);

    return (
        <h1>Hello</h1>
    )

}

export default MatchDetails;