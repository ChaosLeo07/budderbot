const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const prefix = '$/';



const HelpEmbed = new Discord.MessageEmbed()
    .setTitle("Hilfe")
    .setDescription("Hier findest du alle Befehle, die der Bot versteht.")
    .addField("ping", "Zeigt dir die Aktuelle Latenz an.")
    .addField("warm", "AAAAAAAAAAAAAAAA.")
    .addField("beep", "boop.")
    .addField("kalt", "brrrrrrrrrrrrrrrrrrr.")
    .addField("eiskalt", "...lieber nicht xD")
    .addField("server", "Zeigt dir Informationen über den Server an.")
    .addField("help", "Zeigt dir diese Liste an.")


    
client.on('ready', () => {
    console.log('Bot erfolgreich gestartet!');
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'auf 2 Servern | Prefix = "./"',
            type: 'PLAYING'
        }
    })
    });



client.on("message", function(message) {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix)) return;
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
   
  });

  
client.login(config.BOT_TOKEN);