import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get(url)
            .then((res)=>{
                setData(res.data);
                console.log(data);
            })
            // .then(data=> {
            //     setData(data);
            // })
    }, [url])

    console.log(data);
  return { data };
}

export default useFetch