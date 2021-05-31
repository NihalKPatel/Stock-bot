const Discord = require('discord.js');
const axios = require('axios')
const fs = require('fs')
var await = require('await')
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
const utils = require('./utils');
let commandsList = fs.readFileSync('commands/help.txt', 'utf8')

 async function nameplace(region, username){

    const regionApi = axios.create({
        baseURL: 'https://' + region + '.api.riotgames.com/lol',
    });

    //we need the basic info first to get the encrypted id generated by your API Key
    let userBasicInfoResponse = await regionApi.get('/summoner/v4/summoners/by-name/' + username + '?api_key=RGAPI-292c2dec-4319-4440-b607-2b8893c4a219');
    let userBasicInfo = userBasicInfoResponse.data;

    //actual profile info
    let userProfileResponse = await regionApi.get('/league/v4/entries/by-summoner/' + userBasicInfo.id + '?api_key=RGAPI-292c2dec-4319-4440-b607-2b8893c4a219');
    let userLeague = userProfileResponse.data;
    let avatarURL = `http://ddragon.leagueoflegends.com/cdn/10.11.1/img/profileicon/${userBasicInfo.profileIconId}.png`;
    userBasicInfo.avatarURL = avatarURL;

    //making a single array with all info gotten from both requests
    let allInfo = {...userBasicInfo, leagueInfo: userLeague};

    return allInfo;

} //end of default function

const leagueTypeTranslation = (leagueType) => {

    switch(leagueType){

        case 'RANKED_SOLO_5x5':
            return 'Solo/Duo Queue';

        case 'RANKED_FLEX_SR':
            return 'Flex 5x5 Queue';

        default:
            return '';

    }

} //end of leagueTypeTranslation

const checkLeague = (league) => {

    if(league != undefined){

        return  (`${leagueTypeTranslation(league.queueType)}: ${league.tier} ${league.rank} \n` +
                 `Winrate: ${ (league.wins / ( league.wins + league.losses) * 100).toFixed(2) }%  \n\n`);

    }else{

        return '';

    }
}
