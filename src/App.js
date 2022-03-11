import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherForecast from './components/WeatherForecast'

const App = () => {
  const apiKey = '15d026eb86536082ee9212c06a64d2c2'
  const [city, setCity] = useState(null)
  const [state, setState] = useState(null)
  const [postal, setPostal] = useState(null)
  const [clima, setClima] = useState(null)
  const [isLoading, setLoading] = useState(false);

  const getPosition = () => {
    if (navigator.geolocation) {
      setLoading(true)
      navigator.geolocation.getCurrentPosition(showPosition, posError); // Passing in a success callback and an error callback fn
    } else {
      alert("Sorry, Geolocation is not supported by this browser."); // Alert is browser does not support geolocation
    }
  }

  const posError = () => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then(res => {
        if (res.state === 'denied') {
          alert('Enable location permissions for this website in your browser settings.')
        }
      })
    } else {
      alert('Unable to access your location. You can continue by submitting location manually.') // Obtaining Lat/long from address necessary
    }
  }

  const showPosition = (position) => {
    let lat = position.coords.latitude // You have obtained latitude coordinate!
    let long = position.coords.longitude // You have obtained longitude coordinate!
    getClima(lat, long) // Will convert lat/long to City, State, & Zip code
    getAddress(lat, long, 'AIzaSyAtJHwdkezSOfQy40Tg_c7WK81dB7Jfe0Q')
  }

  const getClima = (lat, long) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`)
      .then(res => res.json())
      .then(obj => setClima(obj))
  }

  const getAddress = (lat, long, googleKey) => {
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=-${long}&localityLanguage=pt`)
    // fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${googleKey}`)
      .then(res => res.json())
      .then(address => setZip(address))
  }

  const setZip = (address) => {
    let city = address.city
    let state = address.principalSubdivision
    let postal = address.postcode
    setCity(city)
    setState(state)
    setPostal(postal)
    setLoading(false)
  }

  return (

    <div className="App">
      <header className="App-header">
        <S.Wrapper>
          <S.Button
            variant="primary"
            disabled={isLoading}
            onClick={() => getPosition()}
          >
            {isLoading ? 'Carregando…' : 'Localização atual'}
          </S.Button>
        
          <S.Input placeholder="Cidade" value={city}></S.Input>
          <S.Input placeholder="Estado" value={state}></S.Input>
          <S.Input placeholder="Código Postal" value={postal}></S.Input>
        </S.Wrapper>
        {clima && <WeatherForecast clima={clima} />}
      </header>
    </div>
  );
}

const S = {
  Wrapper: styled.div`
    width: 100%;
    display: flex;
    column-gap: 30px;
    padding-top: 50px;
  `,
  Button: styled(Button)`
    height: 40px;
    margin: 8px 15px;
  `,
  Input: styled.input`
    width: 20%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    height: 40px;
  `
}

export default App;
