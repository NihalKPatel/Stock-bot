// require the discord.js module
const Discord = require('discord.js');
const axios = require('axios')
const fs = require('fs')
var await = require('await')
const client = new Discord.Client();
const { prefix, token } = require('./src/config.json');
const utils = require('./src/utils');
let commandsList = fs.readFileSync('commands/help.txt', 'utf8')
const {userinfo, checkLeague} = require('./src/profile.js');
const regionsArray = ['br1', 'eun1', 'euw1', 'jp1', 'kr', 'la1', 'la2', 'na1', 'oc1', 'ru', 'tr1'];
const moment = require('moment');
const request = require('bluebird').promisifyAll(require('request'), { multiArgs: true });
const convertCurrency = require('nodejs-currency-converter');



// when the client is ready, run this code
// this event will only trigger one time after logging in

client.once('ready', () => {
return console.log('It Works Ready!');
});

/*-----------------------------------------------------------------------------------------------------------------------------*/

client.on('message', async message => {


//Help
if (message.content.toLowerCase() === (prefix)+"help"){
    message.channel.send(commandsList);
}

//Ping
if(message.content.toLowerCase().startsWith("/ping")) {
    message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");
}

//COIN FILP
if (message.content.toLowerCase() === (prefix)+"flip"){
    
    var x = Math.floor(Math.random() * 3)
    if (x === 1){
        message.channel.send('Heads');
    } else if (x === 2){
        message.channel.send('Tails');
    }
}
/*-----------------------------------------------------------------------------------------------------------------------------*/

//Trolls
if (message.content.toLowerCase().includes("krinesh")){
    message.channel.send("is gay Hehehehehehehe", {tts: true})
    
} else if (message.content.toLowerCase().includes("aravind")){
    message.channel.send('is high');
    
} else if (message.content.toLowerCase().includes("suwesh")){
    message.channel.send('<@281709023550636033>');
    
} else if (message.content.toLowerCase().includes("karan")){
    message.channel.send('is single on the 30th');
    
} else if (message.content.toLowerCase().includes("yas")){
    message.channel.send({ files: ["./images/yasuo.gif"] });
    setTimeout(function(){
        message.channel.send("Hehehehehehehe", {tts: true})
    }, 2500);
} else if (message.content.toLowerCase().includes("/matt")){
    message.channel.send("is an introvert")
}

/*-----------------------------------------------------------------------------------------------------------------------------*/

//Dick Size
var args = message.content.substring(prefix.length).split(" ");
switch (args[0]) {
        
        
    case "dick":
        let dicksize = ["8D 1 Inches","8=D 2 Inches", "8==D 4 Inches", "8===D 6 Inches", "8====D  8 Inches", "8=====D 10 Inches", "8======D 12 Inches", "8=======D 14 Inches", "8============D Johnny ", "404 not found"];
        let dickuser = message.mentions.users.first();
        
        if (!dickuser) {
            return message.channel.send('You must mention someone!\n(This is 100% accurate!)');
        }
        if (dickuser.id == "99455348007518208") {
            return message.channel.send(`**${dickuser} Size: ** 404 Not found\nSized by **${message.author.tag}**`);
        }
        
        if (dickuser.id == "160589771565957121") {
            return message.channel.send(`**${dickuser} Size: ** 8-D 1 Inch\nSized by **${message.author.tag}**`);
        }
        
        if (dickuser.id == "183391060536459264") {
            return message.channel.send(`**${dickuser} Size: ** 8-D 1 Inch\nSized by **${message.author.tag}**`);
        }
        
        
        message.channel.send(`**${dickuser} Size: ** ${dicksize[~~Math.floor(Math.random() * dicksize.length)]}\nSized by **${message.author.tag}**`);
        break;
}

/*-----------------------------------------------------------------------------------------------------------------------------*/
//Stocks
if (message.content.startsWith(prefix)){
    var crypto = message.content.replace(/\s/g, '')+"USD";
    stockies(crypto.toUpperCase());
    async function stockies(command) {
        command = command.substring(1);
        let stock = async () => {
            let response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${command}?apikey=77ec0dcfd99692661c435742dc66dbb3`);
            console.log(command);
            console.log(`https://financialmodelingprep.com/api/v3/quote/${command}?apikey=77ec0dcfd99692661c435742dc66dbb3`);
            
            let quote = response.data;
            return quote;
        };
        let quoteValue = await stock();
        quoteValue = quoteValue[0];
        console.log(quoteValue);
        message.channel.send(`\nHeres your Stock Price for ${quoteValue.symbol}(${quoteValue.name}):\n$${quoteValue.price} USD.\n`);

        /*
        USD_NZD = convertCurrency(Number('{quoteValue.price}'), 'USD', 'NZD').then(response => response);
        console.log(USD_NZD);
        message.channel.send(USD_NZD);
        */
        const fixerUrl = 'https://api.fixer.io';

        const convertCurrency = (value = Number('quoteValue.price')) => {
          //const formatedDay = (!day) ? '/latest' : moment(day).format('YYYY-MM-DD');

          return new Promise((resolve, reject) => request.getAsync(`${fixerUrl}/${formatedDay}?base=$USD`).then((response) => {
            const parsedResponse = JSON.parse(response[1]);

            if (typeof value !== 'number') reject(new Error('Value to convert is NaN.'));
            if (parsedResponse.error === 'Invalid base') {
                reject(new Error('Invalid currency base.'));
            } else if (!Object.keys(parsedResponse.rates).includes('NZD')) {
                reject(new Error('Invalid currency to convert.'));
            }
            console.log(convertedValue);
            console.log("HOLYHABIBÍ");
              
            const rateFrom = parsedResponse.rates['NZD'];
            const convertedValue = value * rateFrom;
            resolve({
              currencyFrom,
              currencyTo,
              value,
              convertedValue,
            });
            
          }));
        };
        
        test('test module', () => {
          expect.assertions(1);

            return convertCurrency(Number(quoteValue.price), 'USD', 'NZD').then(response => {
            expect(response).toBeDefined();
            console.log("HOLYHABIBÍ");

            })
        });
        
    }
}

/*if (message.content.startsWith(prefix)){
    var origMessage = message.content.replace(/\s/g, '');
    stockies(origMessage.toUpperCase());
    async function stockies(command) {
        command = command.substring(1);
        let stock = async () => {
            let response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${command}?apikey=77ec0dcfd99692661c435742dc66dbb3`);
            console.log(command);
            console.log(`https://financialmodelingprep.com/api/v3/quote/${command}?apikey=77ec0dcfd99692661c435742dc66dbb3`);
            
            let quote = response.data;
            return quote;
        };
        let quoteValue = await stock();
        quoteValue = quoteValue[0];
        console.log(quoteValue);
        
        message.channel.send(`\nHeres your Stock Price for ${quoteValue.symbol} (${quoteValue.name}):\n$${quoteValue.price} USD`);
    }
    }
*/
    if (message.content.startsWith(prefix)){
        var origMessage = message.content.replace(/\s/g, '');
        stockies(pre_afterhours.toUpperCase());
        if (url.indexOf("https://www.marketwatch.com/investing/stock/")===0){
        const getScript = (url) => {
            return new Promise((resolve, reject) => {
                const http      = require('http'),
                      https     = require('https');

                let client = http;

                if (url.toString().indexOf("https") === 0) {
                    client = https;
                }

                client.get(url, (resp) => {
                    let data = '';

                    // A chunk of data has been recieved.
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });
                    
                    // The whole response has been received. Print out the result.
                        resp.on('end', () => {
                                message.channel.send("\nAfter Hours Price is currently:\n$" + data.split('<h3 class="intraday__price ">')[1].split("</bg-quote>")[0].split('session="')[1].split('">')[1] + " USD.");
                        });

                }).on("error", (err) => {
                    reject(err);
                });
                
            });
        };

        (async (url) => {
            
            var date = new Date();
            var current_hour = date.getHours();
            var current_minute = date.getMinutes();
            //if ((current_hour <= 15 && current_minute <= 30) || (current_hour >= 21 && current_minute >= 30)) {
            if ((current_hour >= 0 && current_hour < 3 || (current_hour == 3 && current_minute < 30)) || (current_hour >= 10 && current_hour <= 23)) {
                // This should allow for all hours outside of open market to trigger? */
            console.log(url);
            console.log(await getScript(url));
            }
            //}
        })(`https://www.marketwatch.com/investing/stock/${pre_afterhours.split("/")[1].split("(")[0].toLowerCase()}`);
    }
    }
    
    
        



/*-----------------------------------------------------------------------------------------------------------------------------*/
});
// login to Discord with your app's token
client.login(token);

