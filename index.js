const Discord = require('discord.js')
const { Client, RichEmbed } = require('discord.js')
const bot = new Discord.Client()
const token = process.env.token;
const cfg = require('./index.json')
var prefix = ("|")

bot.login(token)

bot.on ('ready', function (){
	bot.user.setGame('vous aider ' + prefix + 'help').catch(console.error)
})

// commandes
bot.on('message', function (message){
	
	if(message.content.startsWith(prefix + "bonjour")){
		const user = message.mentions.users.first();
		/*const embed = new RichEmbed()
			.setTitle('Bonjour')
			.setColor('GREEN')
			.setDescription('que puis-je pour vous ? (|help pour voir les commandes)');
			message.channel.send(embed);*/
		message.reply('bonjour, que puis-je pour vous ? ('+prefix+'help pour voir les commandes)')
	}
	
	if (message.content.startsWith(prefix + "send")) {
		let arg = message.content.split(" ").slice(1);
		let desc = arg.join(" ")
		const embed = new RichEmbed()
			.setColor('GREEN')
			.setDescription(desc)
			.setFooter(`Envoyé par: ${message.author.tag}`)
			.setTimestamp();
		message.channel.send(embed);
    }

	if(message.content === prefix + 'serv-info' ||message.content === prefix + 'si'){
		const embed = new RichEmbed()
			.setTitle('Information du serveur')
			.addField("Nom du serveur", message.guild.name)
			.addField("Crée le ", message.guild.createdAt)
			.addField("Crée par ", message.guild.owner.user.tag)
			.addField("Le bot a rejoin le", message.guild.joinedAt)
			.addField("Utilisateurs présents", message.guild.memberCount)
			.addField("Nombres de salon ", message.guild.channels.size)
			.addField("Nombre de rôle ", message.guild.roles.size)
			.addField("Humains", message.guild.members.filter(member => !member.user.bot).size, true)
			.addField("Bots", message.guild.members.filter(member => member.user.bot).size, true)
			.setColor("ORANGE")
			.setFooter(`Demandé par: ${message.author.tag}`)
			.setTimestamp();
		message.channel.send(embed);
	}
	
	if(message.content.startsWith(prefix + "sondage")){
		let args = message.content.split(" ").slice(1);
		let thingToEcho = args.join(" ")
		const embed = new RichEmbed()
			.setColor('GOLD')
			.addField(thingToEcho, "Répondre avec :thumbsup: ou :thumbsdown:.")
			.setFooter(`Envoyé par: ${message.author.tag}`)
			.setTimestamp();
		message.channel.send(embed)
		.then(function (message){
			message.react("👍")
			message.react("👎")
		}).catch(function(){
		});
	}
	
	if(message.content.startsWith(prefix + "user-info") || message.content.startsWith(prefix + "ui")){
		let user = message.mentions.users.first() || message.author;
		const embed = new RichEmbed()
			.setColor('BLUE')
			//.setTitle(`${user.tag} Info`)
			.setFooter(`Demandé par: ${message.author.tag}`)
			.setTimestamp()
			.addField("Pseudo Discord:", user.username)
			.addField("Discriminator:", `#${user.discriminator}`)
			.addField("Création du compte:", user.createdAt)
			.addField("Status:", user.presence.status)
			.addField("Joue à:", `${user.presence.game ? user.presence.game.name : 'Ne joue pas'}`);
		message.channel.send(embed);
	}
	
	if(message.content.startsWith(prefix + "bot-info") || message.content.startsWith(prefix + "bi")){
		const embed = new RichEmbed()
			.setAuthor(bot.user.username, bot.user.avatarURL)
			.setColor('NAVY')
			.setTitle("__Voici les informations sur le bot__")
			.setFooter(`Demandé par: ${message.author.tag}`)
			.setTimestamp()
			.addField(":crown: Créateur:", "@Adri1 🇷🇺#6623")
			.addField(":speech_balloon: Channels", bot.channels.size, true)
			.addField(":abcd:Pseudo", bot.user.username)
			.addField(":1234:Discriminator", bot.user.discriminator, true)
			.addField(":clock5: Uptime", Math.round(bot.uptime / (1000 * 60 * 60)) + " heures, " + Math.round(bot.uptime / (1000 * 60)) % 60 + "minutes et " + Math.round(bot.uptime / 1000) % 60 + "secondes    ", true)
			.addField(":file_cabinet:Nombre de serveurs", bot.guilds.size)
			.addField(":bust_in_silhouette:Nombre d'utilisateurs", bot.users.size, true);
		message.channel.send(embed);
	}
	
})

/*//kick
bot.on('message', message => {
  if (!message.guild) return;

  if (message.content.startsWith(prefix + 'kick')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.kick('Raison du kick').then(() => {
          message.reply(`**${user.tag}** à bien été exclu`);
        }).catch(err => {
          message.reply('impossible d\'exclure cet utilisateur');
          console.error(err);
        });
      } else {
        message.reply('Ce joueur n\'est pas sur le serveur');
      }
    } else {
      message.reply(' veuillez mentionner un utilisateur.');
    }
  }
});
*/

//help
bot.on('message', message => {
  if (message.content === prefix + 'help') {
	const embed = new RichEmbed()
      .setTitle('Commande d\'administartions')
      .setColor('AQUA')
	  //.addField("N'oubliez pas le préfixe "+prefix+" avant votre commande d'invocation", "Bientôt personnalisable !")
	  .setDescription('Dire bonjour au bot : '+prefix+'bonjour \n\ Renseignements sur un membre : '+prefix+'user-info [membre] \n\ Envoyer une annonce : '+prefix+'send \'contenu\' \n\ Faire un sondage : '+prefix+'sondage \'question\' \n\ Information sur le serveur : '+prefix+'serv-info \n\ Information sur le bot : '+prefix+'bot-info \n\ \n\ **D\'autres arriveront bientôt**')
		.setFooter(`Demandé par: ${message.author.tag}`)
			.setTimestamp();
	message.channel.send(embed);
  }
});