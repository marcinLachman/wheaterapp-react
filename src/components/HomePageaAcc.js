import { useEffect, useState } from "react";
import axios from 'axios';

const URL = 'http://dataservice.accuweather.com/currentconditions/v1/2-266202_1_AL?apikey=ksWBVwb5rVHGToZXY0jsaQkGhzuJmsEE&language=pl-PL&details=true';

const URL1 = 'http://dataservice.accuweather.com/currentconditions/v1/329149?apikey=ksWBVwb5rVHGToZXY0jsaQkGhzuJmsEE&language=pl-PL&details=true'; //luton

const HomePage = () => {
  const [data, setData] = useState({});
  const [datakr, setDatakr] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = (url, setData1) => {
    axios.get(url)
      .then(response => {
        if ( !response.statusText === 'ok') {
          throw Error("Coś nie tak z połączeniem");
        }
        return response;
      })
      .then( (response) => {
        setData1(response.data);
        setIsLoading(false);
        setError(null);
      })
      .catch( (error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          setIsLoading(false);
          console.log('Error', error.message);
        }
      });
  };

  useEffect(() => {

    const abortCont = new AbortController();

    fetchData(URL, setData);
    fetchData(URL1, setDatakr);
    return () => abortCont.abort();
  }, []);

  console.log(data)

  // const x = parseInt(datakr[0].WeatherIcon);
  // console.log(x)
  // const image = require(`../images/icons/14.svg`).default;
  // http://localhost:3000/static/media/25.bab9ad064fcd00dde36451fa7eb6d5ff.svg

  return (
    <div>
      Pogoda
        {error && <div> {error} </div>}
        {isLoading && <div> Loading... </div>}
        {data[0] ? <h1>{data[0].Temperature.Metric.Value}&#x2103;</h1> : null}
        {error && <div> {error} </div>}
        {isLoading && <div> Loading... </div>}
        {datakr[0] ? <h1>{datakr[0].WeatherIcon}</h1> : null}
        {/* {datakr[0] ? <img src={image} alt="Girl in a jacket" width="500" height="600" /> : null} */}

        {/* {city.main ? <h1>{Math.round(city[0].WeatherText)}&#x2103;</h1> : null} */}
    </div>
  )
}

export default HomePage;