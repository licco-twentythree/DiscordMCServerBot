const Discord = require('discord.js');

//allows us to use the fetch command
const fetch = require('node-fetch');

const { request } = require('http');

const client = new Discord.Client();

// sets the prefix of the commands
const prefix = '=';

var serverOn = false;

client.once('ready', () => {
    console.log('Bot is online')
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'commands'){
        message.channel.send('=start, =ip');
    }
    
    //important commands
    else if (command === 'start'){
        
        //If server is on send message
        if (serverOn == true){
            message.channel.send('Server is already running!')

        }
        //Only start if not running
        if (serverOn == false){
            //Start the server
            require('child_process').exec('cmd /c Start.bat');
            message.channel.send('Server is now starting up!');
            serverOn = true;
        }

    } 

    //stops the server
    else if (command === 'stop'){
        require('child_process').exec('cmd /c Stop.bat');
            message.channel.send('Server is now shutting down!');
            serverOn = false;
    }

    else if (command === 'ip') {
        //fetches ip address from api
        fetch('https://api.ipify.org/?format=json')
            .then(res => res.text())
            .then(text => message.channel.send(text))
        };
    
});

client.login('Nzc3NDc0NTQwNzQ0OTk4OTYy.X7D9lw.S7yqt97jQ1pfYb8_1elYd0wFKn4');
