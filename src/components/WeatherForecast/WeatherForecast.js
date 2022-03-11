import React, { useEffect } from 'react';
import ReactJson from 'react-json-view'

import S from './WeatherForecast.style'
import './WeatherForecast.css'

const WeatherForecast = ({ clima }) => {
  const cidade = clima.name
  console.log(clima)

  const useScript = url => {
    useEffect(() => {
      const script = document.createElement('script');
  
      script.src = url;
      script.async = true;
  
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      }
    }, [url]);
  };

  return <S.Container>
    OpenWeather API

    <S.Wrapper>

      <S.Left>
        <S.Format>JSON</S.Format>
        <S.Dado>Latitude: {clima.coord.lat}</S.Dado>
        <S.Dado>Longitude: {clima.coord.lon} </S.Dado>
        <S.Dado>Sensação térmica: {clima.main.temp} </S.Dado>
        <S.Dado>Temperatura mínima: {clima.main.temp_min} </S.Dado>
        <S.Dado>Temperatura máxima: {clima.main.temp_max} </S.Dado>
        <br/>Vento
        <S.Dado>Graus: {clima.wind.deg} </S.Dado>
        <S.Dado>Rajada: {clima.wind.gast} </S.Dado>
        <S.Dado>Velocidade: {clima.wind.speed} </S.Dado>
      </S.Left>

      <S.Rigth>
        <S.Format>JSON</S.Format>
        <ReactJson style={{ maxHeight: '400px', overflowY: 'scroll' }} src={clima} theme="monokai" />
      </S.Rigth>

    </S.Wrapper>

    Widget para Previsão do Tempo
    
    <div id="wf_div">
      {useScript(`https://tools.tititudorancea.com/weather_forecast.js?place=${cidade}&s=1&days=7&utf8=no&columns=7&lang=pt`)}
    </div>
    
    </S.Container>
  }

export default WeatherForecast