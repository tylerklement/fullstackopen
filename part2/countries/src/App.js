import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({onChangeHandler}) => 
  <div> find countries <input onChange={onChangeHandler} /></div>


const CountryListItem = ({name, handleClick}) => 
  <div>{name} <button onClick={handleClick(name)}>show</button></div>


const CountryStats = ({country}) => 
  <div>
    <h1>{country.name}</h1>
    capital {country.capital} <br />
    population {country.population} <br />
    <h2>languages</h2>
    <ul>
      {country.languages.map(language =>
        <li key={language.name}>{language.name}</li>
      )}
    </ul>
    <img src={country.flag} alt="country flag" width="100px;" height="100px;" />
  </div>

const CountryWeather = ({weather}) =>
  <div>
    <h2>Weather in {weather.location.name}</h2>
    <strong>temperature:</strong> {weather.current.temperature} Celcius <br />
    <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} /> <br />
    <strong>wind:</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
  </div>


const FeaturedCountry = ({country, api_key, weather, setWeather}) =>
{
  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])
  
  return <div>  
    <CountryStats country={country} />
    {
      weather !== ''
      ?  <CountryWeather weather={weather} />
      : <div></div>
    }
  </div>
}


const FilterResults = ({filter, countries, handleShow, api_key, weather, setWeather}) => {
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(filter.toLowerCase())
  )
  
  return filter.trim() === "" ? <div></div>
  : filteredCountries.length === 1 ? 
    <FeaturedCountry country={filteredCountries[0]} api_key={api_key} weather={weather} setWeather={setWeather} />
  : filteredCountries.length <= 10 ? 
    <div>
      {filteredCountries.map(country => 
        <CountryListItem key={country.name} name={country.name} handleClick={handleShow} />
      )}
    </div>
  : <div>Too many matches, specify another filter</div>
  
}


const App = () => {
  const api_key = process.env.REACT_APP_API_KEY
  const [ newFilter, setNewFilter ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ weather, setWeather ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleShow = (country) => () => {
    setNewFilter(country)
  }

  return (
    <div>
      <Filter onChangeHandler={handleFilterChange} />
      <FilterResults filter={newFilter} countries={countries} 
        handleShow={handleShow} api_key={api_key} weather={weather} setWeather={setWeather} />
    </div>
  )
}

export default App;
