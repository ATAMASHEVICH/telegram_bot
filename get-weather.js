import http from 'http';


export const urlNow = 'http://api.openweathermap.org/data/2.5/weather?id=615532&units=metric&lang=ru&APPID=479825020370721b053a8bb62e14e82c';
export const weatherNowFormatter = weather => `Погода в ${weather.name} сейчас:\n Общая хар-ка: ${weather.weather[0].description}\n Температура: ${weather.main.temp}°C\n Влажность: ${weather.main.humidity}%\n Давление: ${weather.main.pressure}\n Ветер: ${weather.wind.speed} м/с`

export const urlForecast = 'http://api.openweathermap.org/data/2.5/forecast?id=615532&units=metric&lang=ru&APPID=479825020370721b053a8bb62e14e82c';
export const dayWeather = weather => {
  
  let multiValueWeather = '';
  for(let i = 1; i < 16; i+=2){
    multiValueWeather+=`Погода в ${weather.city.name} на ${weather.list[i].dt_txt}:\n\n Общая хар-ка: ${weather.list[i].weather[0].description}\n Температура: ${weather.list[i].main.temp}°C\n Влажность: ${weather.list[i].main.humidity}%\n Давление: ${weather.list[i].main.pressure}\n Ветер: ${weather.list[i].wind.speed} м/с\n\n`
  }
  return multiValueWeather;
}
export const getWeather = async (url, formatter) => {

  let promiseResolver;

  const promise = new Promise((resolve, reject) => {

    promiseResolver = resolve;

  });

  http.get(url, res => {
    let data = [];

    res.on('data', chunk => {
        data.push(chunk);
      });
    res.on('end', () => {

        const weather = JSON.parse(Buffer.concat(data).toString());

        const weatherToSend =  formatter(weather);

        promiseResolver(weatherToSend)

      });
    }).on('error', err => {
      console.log('Error: ', err.message);
  });

  return promise;

};