import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchAuthorized = (url) => {
    const [data, setData] = useState(null)

    useEffect(() => {
      axios.get("/api/user_profile/", {headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
      }})
      .then(res=>{
        console.log(res.data)
        setData(res.data)})
      }, [url])

  return { data };
}

export default useFetchAuthorized