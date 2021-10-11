// require the discord.js module
const Discord = require('discord.js');
const axios = require('axios')
const fs = require('fs')
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
let commandsList = fs.readFileSync('commands/help.txt', 'utf8')




// when the client is ready, run this code
// this event will only trigger one time after logging in

client.once('ready', () => {
return console.log('It Works Ready!');
});

/*-----------------------------------------------------------------------------------------------------------------------------*/


client.on('message', async message => {


//Help
if (message.content.toLowerCase() === (prefix)+"help"){
    await message.channel.send(commandsList);
}

//Ping
if (message.content.toLowerCase().startsWith("/ping")) {
    await message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");
}

//COIN FILP
if (message.content.toLowerCase() === (prefix)+"flip"){

    const x = Math.floor(Math.random() * 3);
    if (x === 1) {
        await message.channel.send('Heads');
    } else if (x === 2) {
        await message.channel.send('Tails');
    }
}
    /*-----------------------------------------------------------------------------------------------------------------------------*/

//
    if (message.content.startsWith("/stock")) {
        const crypto = message.content.replace(/\s/g, '');
        await stockies(crypto.toUpperCase());

        async function stockies(command) {
            command = command.substring(6);
            let stock = async () => {
                let response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${command}?apikey=77ec0dcfd99692661c435742dc66dbb3`);
                console.log(command);
                console.log(`https://financialmodelingprep.com/api/v3/quote/${command}?apikey=77ec0dcfd99692661c435742dc66dbb3`);
                return response.data;
        };
        let quoteValue = await stock();
        quoteValue = quoteValue[0];
        console.log(quoteValue);
        await message.channel.send(`\nHeres your Stock Price for ${quoteValue.symbol}(${quoteValue.name}):\n$${quoteValue.price} USD.\n`);

    }
}

    if (message.content.startsWith(prefix)+"crypto"){
        const crypto = message.content.replace(/\s/g, '') + "USD";
        await stockies(crypto.toUpperCase());

        async function stockies(command) {
            command = command.substring(7);
            let stock = async () => {
                let response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${command}?apikey=77ec0dcfd99692661c435742dc66dbb3`);
                console.log(command);
                console.log(`https://financialmodelingprep.com/api/v3/quote/${command}?apikey=77ec0dcfd99692661c435742dc66dbb3`);
                return response.data;
            };
            let quoteValue = await stock();
            quoteValue = quoteValue[0];
            console.log(quoteValue);
            await message.channel.send(`\nHeres your Stock Price for ${quoteValue.symbol}(${quoteValue.name}):\n$${quoteValue.price} USD.\n`);

        }
    }



    if (message.content.startsWith(prefix)){
        const origMessage = message.content.replace(/\s/g, '');
        await stockies(origMessage.toUpperCase());
        let url;
        if (url.indexOf("https://www.marketwatch.com/investing/stock/")===0){
        const getScript = (url) => {
            return new Promise((resolve, reject) => {
                const https     = require('https');

                let client = require('http');

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

        await (async (url) => {

            const date = new Date();
            const current_hour = date.getHours();
            const current_minute = date.getMinutes();
            //if ((current_hour <= 15 && current_minute <= 30) || (current_hour >= 21 && current_minute >= 30)) {
            if ((current_hour >= 0 && current_hour < 3 || (current_hour === 3 && current_minute < 30)) || (current_hour >= 10 && current_hour <= 23)) {
                // This should allow for all hours outside of open market to trigger? */
                console.log(url);
                console.log(await getScript(url));
            }
            //}
        })(`https://www.marketwatch.com/investing/stock/${origMessage.split("/")[1].split("(")[0].toLowerCase()}`);
        }
    }

    /*




/*-----------------------------------------------------------------------------------------------------------------------------*/
});
// login to Discord with your app's token
client.login(token).then(() =>{});

