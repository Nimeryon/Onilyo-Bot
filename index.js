const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json")

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('error', console.error);

client.on('message', async message => {
    if (message.author.bot) return;

    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        //Envoir un message à l'éxécution de la commande et renvoie le temps entre l'envoie de la commande et l'envoie du message
        const m = await message.channel.send("Ping?");

        m.edit(`Pong!\nLa latence avec le serveur est ${m.createdTimestamp - message.createdTimestamp}ms. La latence de l'API est ${Math.round(client.ping)}ms`);
        console.log(`Commande ping éxecuté : La latence avec le serveur est ${m.createdTimestamp - message.createdTimestamp}ms. La latence de l'API est ${Math.round(client.ping)}ms`)
    }

    if (command === "say") {
        const say_message = args.join(" ");

        //Supprime le message de l'utilisateur et ignore les erreurs
        message.delete().catch(o_O => { });

        //Envoie say_message sur le channel présent
        message.channel.send(say_message);

        console.log(`Commande say éxcuté : Onilyo dit "${say_message}"`)
    }

    if (command === "clean") {
        const delete_count = parseInt(args[0], 10);

        if (!delete_count || delete_count < 2 || delete_count > config.max_clean)
            return message.reply(`Entrez un nombre entre 2 et ${config.max_clean}`);

        const fetched = await message.channel.fetchMessages({ limit: delete_count });
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));

        console.log(`Commande clean éxecuté : Suppréssion de ${delete_count} messages`)
    }

    if (command === "clear") {
        const fetched = await message.channel.fetchMessages({ limit: config.max_clean });
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));

        console.log(`Commande clear éxecuté : Suppréssion de ${config.max_clean} messages`)
    }
});

client.login(config.token);