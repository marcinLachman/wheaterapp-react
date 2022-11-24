import { useState, useEffect } from 'react';
import axios from 'axios';
import Clock from 'react-live-clock';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  Divider,
  styled
} from '@mui/material/';

import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';
import WbTwilightOutlinedIcon from '@mui/icons-material/WbTwilightOutlined';
import UmbrellaOutlinedIcon from '@mui/icons-material/UmbrellaOutlined';

const TextStatusTypo = styled(Typography) ( ({ theme }) => ({
  padding: '10px',
  fontSize: '1.5rem',
  fontWeight: '700',
}));

const HomePage = () => {
    const locKamilka = 'broome australia';
    const locMamusia = 'busko zdrój';
    const locMagdusia = 'luton';
    const locMagrcinek = 'hamburg';


    const [dataKamilka, setDataKamilka] = useState({});
    const [dataMamusia, setDataMamusia] = useState({});
    const [dataMagdusia, setDataMagdusia] = useState({});
    const [dataMarcinek, setDataMarcinek] = useState({});

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const iconCodeKamilka = dataKamilka.current_observation ? dataKamilka.current_observation.condition.code : 'na';
    const iconCodeMamusia = dataMamusia.current_observation ? dataMamusia.current_observation.condition.code : 'na';
    const iconCodeMagdusia = dataMagdusia.current_observation ? dataMagdusia.current_observation.condition.code : 'na';
    const iconCodeMarcinek = dataMagdusia.current_observation ? dataMagdusia.current_observation.condition.code : 'na';


  const fetchData = (location, setData) => {

  const url = {
    method: 'GET',
    url: 'https://yahoo-weather5.p.rapidapi.com/weather',
    params: {location: location, format: 'json', u: 'c'},
    headers: {
      'X-RapidAPI-Key': '60b28efe0fmsh06a218a3076c78bp1f94b3jsnfe6a4bcf9e6e',
      'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
    }
  };

    axios.request(url)
      .then(response => {
        if ( !response.statusText === 'ok') {
          throw Error("Coś nie tak z połączeniem");
        }
        return response;
      })
      .then( (response) => {
        setData(response.data);
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

  useEffect( () => {
    const abortCont = new AbortController();
    fetchData(locKamilka, setDataKamilka);
    fetchData(locMamusia, setDataMamusia);
    fetchData(locMagdusia, setDataMagdusia);
    fetchData(locMagrcinek, setDataMarcinek);
    return () => abortCont.abort();
  }, []);

  return (


    <Box sx={{
      margin: '1rem',
    }}>
      {error && <div> {error} </div>}
      {isLoading && <div> Loading... </div>}

    <Paper elevation={3} sx={{
      margin: '2rem'
    }}>
      <Typography sx={{

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }}
      variant="h3"
      >
        Kamilka
      </Typography>
    </Paper>

    <Card >

      <Typography sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around'
      }}
      variant="h3"
      >
        Derby
        <img src={require(`../images/color/${iconCodeKamilka}.png`)} alt="wheater icon" width='100px'/>
      </Typography>

      <Paper elevation={3} sx={{
        margin: '2rem'
      }}>
        <Typography sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        variant="h3"
        >
          <Clock format={'HH:mm:ss'} ticking={true} timezone={'Australia/Perth'} />
        </Typography>
      </Paper>


        <CardContent>
          <Paper elevation={3} sx={{
          margin: '0.2rem',
          padding: '1rem 2rem'
      }}>
            <TextStatusTypo>
              Wschód słońca: {dataKamilka.current_observation ? dataKamilka.current_observation.astronomy.sunrise : null} <WbSunnyTwoToneIcon sx={{
                marginLeft: '1rem',
                fontSize: '40px',
                color: '#EFDC2E'
               }}  />
            </TextStatusTypo>

            <Divider />

            <TextStatusTypo >
              Zachód słońca: {dataKamilka.current_observation ? dataKamilka.current_observation.astronomy.sunset : null}
               <WbTwilightOutlinedIcon sx={{
                marginLeft: '1rem',
                fontSize: '40px',
                color: '#EFDC2E'
               }} />

            </TextStatusTypo>

            <Divider />

            <TextStatusTypo >
              Temperatura: {dataKamilka.current_observation ? dataKamilka.current_observation.condition.temperature : null} &#x2103;
            </TextStatusTypo>

            <Divider />

            <TextStatusTypo >
              Ciśnienie: {dataKamilka.current_observation ? dataKamilka.current_observation.atmosphere.pressure : null} mb
            </TextStatusTypo>

            <Divider />

            <TextStatusTypo >
              Wilgotność: {dataKamilka.current_observation ? dataKamilka.current_observation.atmosphere.humidity : null} % <UmbrellaOutlinedIcon />
            </TextStatusTypo>
          </Paper>
        </CardContent>
    </Card>

    {/* ------------------------------------------------------ */}

    <Paper elevation={3} sx={{
      margin: '2rem'
    }}>
      <Typography sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }}
      variant="h3"
      >
        Mamusia
      </Typography>
    </Paper>

    <Card >

      <Typography sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around'
      }}
      variant="h3"
      >
        Busko Zdrój
        <img src={require(`../images/color/${iconCodeMamusia}.png`)} alt="wheater icon" width='100px'/>
      </Typography>

      <Paper elevation={3} sx={{
        margin: '2rem'
      }}>
        <Typography sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        variant="h3"
        >
          <Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/Warsaw'} />
        </Typography>
      </Paper>


        <CardContent>
          <Paper elevation={3} sx={{
          margin: '0.2rem',
          padding: '1rem 2rem'
      }}>
            <TextStatusTypo>
              Wschód słońca: {dataMamusia.current_observation ? dataMamusia.current_observation.astronomy.sunrise : null} <WbSunnyTwoToneIcon sx={{
                marginLeft: '1rem',
                fontSize: '40px',
                color: '#EFDC2E'
               }}  />
            </TextStatusTypo>

            <Divider />

            <TextStatusTypo >
              Zachód słońca: {dataMamusia.current_observation ? dataMamusia.current_observation.astronomy.sunset : null}
               <WbTwilightOutlinedIcon sx={{
                marginLeft: '1rem',
                fontSize: '40px',
                color: '#EFDC2E'
               }} />

            </TextStatusTypo>

            <Divider />

            <TextStatusTypo >
              Temperatura: {dataMamusia.current_observation ? dataMamusia.current_observation.condition.temperature : null} &#x2103;
            </TextStatusTypo>

            <Divider />

            <TextStatusTypo >
              Ciśnienie: {dataMamusia.current_observation ? dataMamusia.current_observation.atmosphere.pressure : null} mb
            </TextStatusTypo>

            <Divider />

            <TextStatusTypo >
              Wilgotność: {dataMamusia.current_observation ? dataMamusia.current_observation.atmosphere.humidity : null} % <UmbrellaOutlinedIcon />
            </TextStatusTypo>
          </Paper>
        </CardContent>
    </Card>

    {/* --------------------------------------------------------------- */}

    <Paper elevation={3} sx={{
      margin: '2rem'
    }}>
      <Typography sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }}
      variant="h3"
      >
        Magdusia
      </Typography>
    </Paper>

    <Card >

      <Typography sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around'
      }}
      variant="h3"
      >
        Luton
        <img src={require(`../images/color/${iconCodeMagdusia}.png`)} alt="wheater icon" width='100px'/>
      </Typography>

      <Paper elevation={3} sx={{
        margin: '2rem'
      }}>
        <Typography sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        variant="h3"
        >
          <Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/London'} />
        </Typography>
      </Paper>


        <CardContent>
          <Paper elevation={3} sx={{
          margin: '0.2rem',
          padding: '1rem 2rem'
      }}>
            <TextStatusTypo>
              Wschód słońca: {dataMagdusia.current_observation ? dataMagdusia.current_observation.astronomy.sunrise : null} <WbSunnyTwoToneIcon sx={{
                marginLeft: '1rem',
                fontSize: '40px',
                color: '#EFDC2E'
               }}  />
            </TextStatusTypo>

            <Divider />

            <TextStatusTypo >
              Zachód słońca: {dataMagdusia.current_observation ? dataMagdusia.current_observation.astronomy.sunset : null}
               <WbTwilightOutlinedIcon sx={{
                marginLeft: '1rem',
                fontSize: '40px',
                color: '#EFDC2E'
               }} />

            </TextStatusTypo>

            <Divider />

            <TextStatusTypo >
              Temperatura: {dataMagdusia.current_observation ? dataMagdusia.current_observation.condition.temperature : null} &#x2103;
            </TextStatusTypo>

            <Divider />

            <TextStatusTypo >
              Ciśnienie: {dataMagdusia.current_observation ? dataMagdusia.current_observation.atmosphere.pressure : null} mb
            </TextStatusTypo>

            <Divider />

            <TextStatusTypo >
              Wilgotność: {dataMagdusia.current_observation ? dataMagdusia.current_observation.atmosphere.humidity : null} % <UmbrellaOutlinedIcon />
            </TextStatusTypo>
          </Paper>
        </CardContent>
    </Card>

    {/* --------------------------------------------------------------- */}

    <Paper elevation={3} sx={{
      margin: '2rem'
    }}>
      <Typography sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }}
      variant="h3"
      >
        Marcinek
      </Typography>
    </Paper>

    <Card>

      <Typography sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around'
      }}
      variant="h3"
      >
        Hamburg
        <img src={require(`../images/color/${iconCodeMarcinek}.png`)} alt="wheater icon" width='100px'/>
      </Typography>

      <Paper elevation={3} sx={{
        margin: '2rem'
      }}>
        <Typography sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        variant="h3"
        >
          <Clock format={'HH:mm:ss'} ticking={true} timezone={'Europe/Berlin'} />
        </Typography>
      </Paper>


        <CardContent>
          <Paper elevation={3} sx={{
          margin: '0.2rem',
          padding: '1rem 2rem'
      }}>
            <TextStatusTypo>
              Wschód słońca: {dataMarcinek.current_observation ? dataMarcinek.current_observation.astronomy.sunrise : null} <WbSunnyTwoToneIcon sx={{
                marginLeft: '1rem',
                fontSize: '40px',
                color: '#EFDC2E'
               }}  />
            </TextStatusTypo>

            <Divider />

            <TextStatusTypo >
              Zachód słońca: {dataMarcinek.current_observation ? dataMarcinek.current_observation.astronomy.sunset : null}
               <WbTwilightOutlinedIcon sx={{
                marginLeft: '1rem',
                fontSize: '40px',
                color: '#EFDC2E'
               }} />

            </TextStatusTypo>

            <Divider />

            <TextStatusTypo >
              Temperatura: {dataMarcinek.current_observation ? dataMarcinek.current_observation.condition.temperature : null} &#x2103;
            </TextStatusTypo>

            <Divider />

            <TextStatusTypo >
              Ciśnienie: {dataMarcinek.current_observation ? dataMarcinek.current_observation.atmosphere.pressure : null} mb
            </TextStatusTypo>

            <Divider />

            <TextStatusTypo >
              Wilgotność: {dataMarcinek.current_observation ? dataMarcinek.current_observation.atmosphere.humidity : null} % <UmbrellaOutlinedIcon />
            </TextStatusTypo>
          </Paper>
        </CardContent>
    </Card>

    </Box>



      // {data.current_observation ? <h1>{data.current_observation.condition.temperature}</h1> : null}
      // {data1.current_observation ? <h1>{data1.current_observation.condition.temperature}</h1> : null}
      // {data.current_observation ? <h1>{data.location.city}</h1> : null}
      // {data1.current_observation ? <h1>{data1.location.city}</h1> : null}
  )
}

export default HomePage