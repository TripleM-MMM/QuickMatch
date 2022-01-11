import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
    const [data, setData] = useState(null)

    useEffect(() => {
      axios.get('http://localhost:8000'+url, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then((res) => {
            console.log(res.data)
            setData(res.data)})
    }, [url])

  return { data };
}

export default useFetch