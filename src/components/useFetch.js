import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
    const [data, setData] = useState(null)

    useEffect(() => {
      axios.get('http://localhost:8000/api/matches/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then((res) => {
            setData(res.data)})
    }, [url])

  return { data };
}

export default useFetch