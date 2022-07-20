import TelegramApi from 'node-telegram-bot-api';
import http from 'http';
import { readFile } from 'fs/promises';
import { getWeather, urlForecast, urlNow, weatherNowFormatter, dayWeather } from './get-weather.js';
const dict = JSON.parse(await readFile(new URL('./dict.json', import.meta.url)));

http.createServer().listen(process.env.PORT || 5000).on('request', function(req, res){
    res.end('')
});

const token = '5546998299:AAHfVftqXLNy--miQc7JkcAYkXDFQ26HlVI';
const bot = new TelegramApi(token, { polling: true });
const compliments = dict.compliments;


bot.setMyCommands([
    {command: '/weather', description: 'Получить погоду'},
    {command: '/weather3', description: 'Получить погоду на 3 дня'},
    {command: '/compliment', description: 'Получить комплимент'},
    {command: '/wake_up_neo', description: 'Разбудить Нео'},
]);


const start = () => {


    // const m = new Date().getMinutes();
    // setTimeout(() => {
    //     if(Date.now)
    // })
    // bot.sendMessage(735465480, '');

    




  

    bot.on('message', async (msg) => {

    const text = msg.text;
    const chatId = msg.chat.id;


     
            if(text==='/compliment'||text.toLowerCase().indexOf('комплимент')!==-1){
                return bot.sendMessage(chatId, `${msg.from.first_name}, ты ${compliments[Math.round(Math.random()*100)]}`);
            }
        

        // if(text==='/wake_up_neo'){

        //     bot.sendMessage(283432158, 'Timer started!');

        //     for(let i = 0; i< 100; i++){
        //         setTimeout(() => {
        //             bot.sendMessage(283432158, 'Wake up Neo!');
        //        }, 6400*1000);
        //     }
        // }


        if(msg.from.id !== 735465480 && text==='/weather'){
            const weatherNow = await getWeather(urlNow, weatherNowFormatter);

            return bot.sendMessage(chatId, weatherNow);
        }

        if(msg.from.id !== 735465480 && text==='/weather3'){
            const weather3 = await getWeather(urlForecast, dayWeather);

            return bot.sendMessage(chatId, weather3);
        }
        


        // return bot.sendMessage(chatId, '❤️');
    });

    
}

start();