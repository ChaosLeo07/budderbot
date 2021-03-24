const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const fs = require('fs');
const prefix = './';

function do8Ball() {
    var rand = [':8ball: Denk nicht mal dran.', ':8ball: Wahr', ':8ball: Unmöglich.', ':8ball: Aber sicher doch!', ':8ball: Eher nicht.', ':8ball: Wahr.', ':8ball: Falsch.', ':8ball: Meine Quellen sagen nein.', ':8ball: Frag später nochmal', ':8ball: Kann grad nichts vorhersagen', ':8ball: Konzentrier dich und frag nocheinmal.'];

    return rand[Math.floor(Math.random()*rand.length)];
}


const HelpEmbed = new Discord.MessageEmbed()
    .setTitle("Hilfe")
    .setDescription("Hier findest du alle Befehle, die der Bot versteht.")
    .addField("ping", "Zeigt dir die Aktuelle Latenz an.")
    .addField("echo", "Wie der Name schon sagt. | Benutzung: ./echo text")
    .addField("warm", "AAAAAAAAAAAAAAAA.")
    .addField("beep", "boop.")
    .addField("8ball", "Wahrsagerdings. | Benutzung: ./8ball text")
    .addField("kalt", "brrrrrrrrrrrrrrrrrrr.")
    .addField("eiskalt", "...lieber nicht xD")
    .addField("server", "Zeigt dir Informationen über den Server an.")
    .addField("title", "Spielt die Legendäre OOBE-Musik aus Windows XP namens title.wma ab.")
    .addField("leave", "keine ahnung was ich hier schreiben soll auf jeden fall verlässt der bot den sprachkanal")

    .addField("help", "Zeigt dir diese Liste an.")

client.on('ready', () => {
    console.log('Bot erfolgreich gestartet!');
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'Prefix = "./" | auf 3 Servern',
            type: 'PLAYING'
        }
    })
    });

client.on("message", function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.channel.send(`Pong! Die Latenz beträgt im moment ${timeTaken}ms.`);
      }
        
    if (command === "help") {
        message.channel.send(HelpEmbed)  
    }



    if (command === "beep") {
        message.channel.send("boop")
    }

    if (command === "eiskalt") {
        message.channel.send("*stirbt*")
    }

    if (command === "warm") {
        message.channel.send("AAAAAAAAA IST DAS HEIß!!")
    }

    if (command === "kalt") {
        message.channel.send("brrrrrrr k-k-KALT!")
    }
    
    if (command === `server`) {
        message.channel.send(`Serverinfos:\nServername: ${message.guild.name}\nMitgliederzahl: ${message.guild.memberCount}`);
    }

    if (command === "echo") {
        var textToEcho = args.join(" ");
        const echoembed = new Discord.MessageEmbed()
        .setTitle(`${textToEcho}`)
        message.channel.send(echoembed);
        return message.delete().catch(O_o=>{});
    } 

    if (command === "8ball") {
        message.channel.send(do8Ball())
      }
    
    // else message.channel.send("Error 404: Command not found");

  });

  client.on('message', async message => {
	
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
	if (command === `title`) {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            connection.play('title.mp3');
            message.channel.send("Erledigt!")
        }

        else 
        message.channel.send("Du musst in einem Sprachkanal sein, um diesen Befehl zu benutzen!")
    }

    if (command === `leave`) {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            connection.disconnect();
            message.channel.send("Erledigt!")
        }
        else 
        message.channel.send ("Du musst in einem Sprachkanal sein, um diesen Befehl zu benutzen!")
        
    }

});
 
client.login(config.BOT_TOKEN);