import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fetch from 'isomorphic-unfetch';

import Spinner from '../components/Spinner';
import ErrorContainer from '../components/ErrorContainer';

import Cards from './Cards';

const {REACT_APP_OPENWEATHER_API_KEY} = process.env;
console.log(REACT_APP_OPENWEATHER_API_KEY);

function Search({ query }) {
  const [ inputQuery, setInputQuery ] = useState(query || "");
  const [ forcasts, setForcasts ] = useState([]);
  const [ weather, setWeather ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isError, setIsError ] = useState(false);
  const history = useHistory();
  var allWeather = [];

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    async function fetchSearchResults() {
      let responseBody = {};
      setIsLoading(true);
      setIsError(false);
      try {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${REACT_APP_OPENWEATHER_API_KEY}`);
        responseBody = await res.json();
        console.log(responseBody);
      } catch (e) {
        if (e instanceof DOMException) {
          console.log("HTTP request aborted");
        } else {
          setIsError(true);
          console.log(e);
        }
      }
      console.log(ignore);
      if (!ignore) {
        setForcasts(responseBody.list || []);
        setIsLoading(false);

      }
    }
    if (query) {
      fetchSearchResults();
    }

    console.log("forcasts cool", forcasts);

    var weatherString = "";

    for(var key of Object.keys(forcasts)) {
      weatherString = JSON.stringify(forcasts[key].weather);
      //console.log(key + " -> " + JSON.stringify(forcasts[key].weather));
      //console.log("weatherstring: ", weatherString);
      var weather_parse = JSON.parse(weatherString);
      console.log(weather_parse.icon);

    }



    return () => {
      controller.abort();
      ignore = true;
    };
  }, [ query ]);

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        history.push(`?q=${inputQuery}`);
      }}>
        <input value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <h2>Weather in {query} in the past 5 days (every 3 hours)</h2>
      {isError && <ErrorContainer>Error message!</ErrorContainer>}
      {isLoading ? (
        <Spinner />
      ) : (
        <ul>
          {forcasts.map(forcast => (
            <div className="row">
              <Cards icon={forcast.weather[0].icon} date={forcast.dt_txt} temp_max={forcast.main.temp_max} temp_min={forcast.main.temp_min} desc={forcast.weather[0].description}/>
            </div>
          ))}

        </ul>
      )}
    </div>
  );
}

export default Search;
