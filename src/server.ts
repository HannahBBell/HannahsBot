import { Telegraf } from 'telegraf'
import getBotTokenOrQuit from './util/getBotToken';
import fetch from 'node-fetch';

const botToken = getBotTokenOrQuit();

const bot = new Telegraf(botToken)

// fetch("http://yerkee.com/api")
//     .then(res => res.json())
//     .then(json => console.log(json));

bot.start((ctx) => ctx.reply("Hello!  Let's talk!"))
bot.help((ctx) => ctx.reply('Try typing /fortune'))
bot.hears('hello', (ctx) => ctx.reply('Ok, I heard you say hello'))
bot.command('sing', (ctx) => ctx.reply('La la la!  I got your command.'))
bot.command('time', (ctx) =>  ctx.reply('Thurs April 8 2021 15:41:36 GMT+0000'))
bot.command('fortune', async (ctx) =>  {
    const res = await fetch("http://yerkee.com/api/fortune")
    const fortuneTold = await res.json()
    ctx.reply(fortuneTold.fortune)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
