// Require the necessary modules
const { Client, Intents } = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const config = require('./config.json');

// Create a new Discord client

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
// Read the commands from the help file
const helpText = fs.readFileSync('commands/help.txt', 'utf8');

// Event listener for when the bot is ready
client.once('ready', () => {
    console.log('Bot is ready!');
});

// Event listener for incoming messages
client.on('message', async message => {
    // Ignore messages from other bots and messages that don't start with the prefix
    if (message.author.bot || !message.content.startsWith(prefix)) {
        return;
    }

    // Remove the prefix from the message content and convert to lowercase
    const args = message.content.slice(prefix.length).trim().toLowerCase().split(/\s+/);
    const command = args.shift();

    // Help command
    if (command === 'help') {
        await message.channel.send(helpText);
    }

    // Ping command
    if (command === 'ping') {
        const ping = Date.now() - message.createdTimestamp;
        await message.channel.send(`Latency is ${ping}ms.`);
    }

    // Coin flip command
    if (command === 'flip') {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        await message.channel.send(result);
    }

    // Stock and crypto commands
    if (['stock', 'crypto'].includes(command)) {
        // Extract the stock or crypto symbol from the arguments
        const symbol = args[0];
        if (!symbol) {
            return await message.channel.send('Please provide a valid symbol.');
        }

        try {
            // Make API call to get the stock or crypto price
            const response = await axios.get(`https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${config.apiKey}`);
            const quote = response.data[0];

            // Send the price information to the channel
            const messageText = `Here's the price for ${quote.symbol} (${quote.name}):\n$${quote.price} USD.`;
            await message.channel.send(messageText);
        } catch (error) {
            await message.channel.send('Error retrieving price information.');
        }
    }

    // After hours stock price command
    if (command === 'afterhours') {
        // Extract the stock symbol from the arguments
        const symbol = args[0];
        if (!symbol) {
            return await message.channel.send('Please provide a valid symbol.');
        }

        try {
            // Make API call to get the after hours stock price
            const url = `https://www.marketwatch.com/investing/stock/${symbol.toLowerCase()}`;
            const response = await axios.get(url);
            const priceText = response.data.split('<bg-quote class="value"')[1].split('data-field="last"')[1].split('>')[1].split('</')[0];

            // Send the price information to the channel
            const messageText = `After hours price for ${symbol.toUpperCase()}: $${priceText} USD.`;
            await message.channel.send(messageText);
        } catch (error) {
            await message.channel.send('Error retrieving price information.');
        }
    }
});

// Log in to Discord with the bot token
client.login(config.token).then(r => console.log('Logged in!')).catch(e => console.log(e));