const Discord = require('discord.js')
const { Client, RichEmbed } = require('discord.js')
const bot = new Discord.Client()
const token = process.env.token;
const tokenTest = process.env.tokentest;
const cfg = require('./index.json')
var prefix = ("a!")
var websit = ("https://sites.google.com/view/assistant-bot")
var wbmsgroom = ("assistant-cmd");

//version normal
bot.login(token)

//version test
//bot.login(tokenTest)

// lancement du bot (console)
bot.on('ready', () => {
  console.log('Utilise moi!')
  console.log('Connecté en tant que '+bot.user.tag+' ('+bot.user.id+') sur '+bot.guilds.size+' serveurs');
});

//quand le bot rejoin un serv
bot.on('guildCreate', function(guild){
	guild.createChannel('assistant--cmd', 'text')
		.then(console.log)
		.catch(console.error);
	setTimeout(sendMsgVerif658984,1000);
	function sendMsgVerif658984(){
		const embed = new RichEmbed()
			.setColor('BLUE')
			.setDescription("C'est ici que vous pouvez executer des commandes "+guild.owner.user.tag+" sans encombrer les salons de tchat. C'est ici que j'enverrais également un message quand un membre quitte ou rejoin le serveur. ***/!\ VEUILLEZ NE PAS RENOMMER CE SALON /!\***")
			.setFooter(`Message automatique`)
			.setTimestamp();
		guild.channels.find("name", "assistant-cmd").send(embed)
	}
})

//lancement du bot + ce qu'il affiche comme jeu en cour
bot.on ('ready', function(){
	bot.user.setGame(prefix + 'help || actif sur '+bot.guilds.size+' serveurs'/*|| '+member.guild.member-count+' membres'*/).catch(console.error)
setTimeout(showUsers,10000);

function showServ(){
	bot.user.setGame(prefix + 'help || actif sur '+bot.guilds.size+' serveurs').catch(console.error)
setTimeout(showUsers,10000);
}

function showUsers(){
	bot.user.setGame(prefix + 'help || utilisé par '+bot.users.size+' utilisateurs').catch(console.error)
setTimeout(showChannels,10000); 
}

function showChannels(){
	bot.user.setGame(prefix + 'help || surveille '+bot.channels.size+' salons').catch(console.error)
setTimeout(showServ,10000); 
}

})

//event qq1 join + qq1 quitte
bot.on('guildMemberAdd', member =>{
	const embed = new RichEmbed()
		.setColor('GOLD')
		.addField("Nouveau membre !", `${member} nous a rejoint, nous sommes maintenant **${member.guild.memberCount}** grâce à lui/elle`, true)
		.setFooter(`Message automatique`)
		.setTimestamp();
	member.guild.channels.find("name", "assistant-cmd").send(embed)
})
bot.on('guildMemberRemove', member =>{
	const embed = new RichEmbed()
		.setColor('BLACK')
		.addField("Un membre nous à quitté...", `${member} nous a quitté, nous sommes maintenant **${member.guild.memberCount}**.`, true)
		.setFooter(`Message automatique`)
		.setTimestamp();
	member.guild.channels.find("name", "assistant-cmd").send(embed)
})

// commandes
bot.on('message', function (message){
	
	if(message.content.startsWith(prefix + "bonjour") || message.content.startsWith(prefix + "bjr") || message.content.startsWith(prefix + "slt")){
		const user = message.mentions.users.first();
		message.reply('bonjour, que puis-je pour vous ? ( **'+prefix+'help** pour voir les commandes )')
	}
	
	/*
	if(message.content.startsWith(prefix + "setup-cmd") || message.content.startsWith(prefix + "cmd")){
		if(message.channel.permissionsFor(message.member).hasPermission("MANAGE_CHANNELS")){
			message.guild.createChannel('assistant--cmd', 'text')
				.then(console.log)
				.catch(console.error);
			message.reply('le salon **assistant-cmd** a bien été créé')
			setTimeout(sendMsgVerif658984,1000);
			function sendMsgVerif658984(){
				const embed = new RichEmbed()
					.setColor('BLUE')
					.setDescription("C'est ici que vous pourrez executer des commandes "+guild.owner.user.tag+" sans encombrer les salons de tchat. C'est ici que j'enverrais également un message quand un membre quitte ou rejoin le serveur.")
					.setFooter(`Message automatique`)
					.setTimestamp();
				message.guild.channels.find("name", "assistant-cmd").send(embed)
			}
		}else{
		message.reply('Vous n\'avez pas l\'autorisation d\'ajouter des salons');
		}
	}*/
	
	if(message.content.startsWith(prefix + "member-count") || message.content.startsWith(prefix + "mc")){
		message.channel.bulkDelete(1)
		message.reply('nous sommes actuellement **'+ message.guild.memberCount +'**')
	}
	
	if (message.content.startsWith(prefix + "send")) {
		message.channel.bulkDelete(1)
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
		message.channel.bulkDelete(1)
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
	
	if(message.content.startsWith(prefix + "sondage") || message.content.startsWith(prefix + "sd")){
		let args = message.content.split(" ").slice(1);
		let thingToEcho = args.join(" ")
		message.channel.bulkDelete(1)
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
		message.channel.bulkDelete(1)
		const embed = new RichEmbed()
			.setColor('BLUE')
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
		message.channel.bulkDelete(1)
		const embed = new RichEmbed()
			.setAuthor(bot.user.username, bot.user.avatarURL)
			.setColor('NAVY')
			.setTitle("__Voici les informations sur le bot__")
			.setFooter(`Demandé par: ${message.author.tag}`)
			.setTimestamp()
			.addField(":crown: Créateur:", "@Дdяi1 🇷🇺#6623")
			.addField(":speech_balloon: Channels", bot.channels.size, true)
			.addField(":abcd: Pseudo", bot.user.username)
			.addField(":1234: Discriminator", bot.user.discriminator, true)
			.addField(":clock5: Temps d'activité", Math.round(bot.uptime / (1000 * 60 * 60)) + " heures, " + Math.round(bot.uptime / (1000 * 60)) % 60 + "minutes et " + Math.round(bot.uptime / 1000) % 60 + "secondes    ", true)
			.addField(":file_cabinet: Nombre de serveurs", bot.guilds.size)
			.addField(":globe_with_meridians: Site internet", websit, true)
			.addField(":bust_in_silhouette: Nombre d'utilisateurs", bot.users.size, true);
		message.channel.send(embed);
	}
	
	if(message.content.startsWith(prefix + "suppr") || message.content.startsWith(prefix + "clear") || message.content.startsWith(prefix + "clean")){
		if(message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES")){
			let msg = message.content.split(' ')
			msg.shift()
			
			if(message.content === prefix + 'suppr'){
				message.reply('Combien de messages souhaitez-vous supprimé ?')
			}else{
				message.channel.bulkDelete(1)
				let x = parseInt(msg[0], 10)
				if(x > 100){
					x = 100
				}
				
				message.delete()
				message.channel.bulkDelete(x)
				message.reply(x + ' messages supprimés')
				message.channel.bulkDelete(1)
			}
		}else{
		message.reply('Vous n\'avez pas l\'autorisation de supprimer des messages');
		}
	}
})

//kick 
bot.on('message', message => {
  if (!message.guild) return;

  if (message.content.startsWith(prefix + 'kick')) {
	  if(message.channel.permissionsFor(message.member).hasPermission("KICK_MEMBERS")){
		const user = message.mentions.users.first();
		if (user) {
		  const member = message.guild.member(user);
		  if (member) {
			  message.channel.bulkDelete(1)
			member.kick('They are bad!').then(() => {
			const embed = new RichEmbed()
			  .setTitle('Expulsion')
			  .setColor('RED')
			  .setDescription(`**${user.tag}** a bien été kick par **${message.author.tag}**`)
			  .setFooter(`Kick par ${message.author.tag}`)
			  .setTimestamp();
			message.channel.send(embed);
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
	  }else{
		message.reply('Vous n\'avez pas l\'autorisation d\'expulser des utilisateurs');
	}
  }
});

//fake kick 
bot.on('message', message => {
  if (!message.guild) return;

  if (message.content.startsWith(prefix + 'fake-kick') || message.content.startsWith(prefix + 'fk')) {
		const user = message.mentions.users.first();
		if (user) {
		  const member = message.guild.member(user);
		  if (member) {
		    const embed = new RichEmbed()
			  .setTitle('Expulsion (fake)')
			  .setColor('RED')
			  .setDescription(`**${user.tag}** a bien été kick par **${message.author.tag}**`)
			  .setFooter(`Kick fake par ${message.author.tag}`)
			  .setTimestamp();
			message.channel.send(embed);
		  } else {
			message.reply('Ce joueur n\'est pas sur le serveur');
		  }
		} else {
		  message.reply(' veuillez mentionner un utilisateur.');
		}
  }
});

//banne 
bot.on('message', message => {
  if (!message.guild) return;

  if (message.content.startsWith(prefix + 'ban')) {
	if(message.channel.permissionsFor(message.member).hasPermission("BAN_MEMBERS")){
		const user = message.mentions.users.first();
		if (user) {
		  const member = message.guild.member(user);
		  if (member) {
			member.ban({
			  reason: 'They were bad!',
			}).then(() => {
				message.channel.bulkDelete(1)
			    const embed = new RichEmbed()
				  .setTitle('Bannisement')
				  .setColor('RED')
				  .setDescription(`**${user.tag}** a bien été banni par **${message.author.tag}**`)
				  .setFooter(`Ban par ${message.author.tag}`)
				  .setTimestamp();
				message.channel.send(embed);
			}).catch(err => {
			  message.reply('impossible de bannir ce membre');
			  console.error(err);
			});
		  } else {
			message.reply('Ce membre n\'est pas du serveur');
		  }
		} else {
		  message.reply('Vous n\'avez pas mentionner l\'ultisateur à banne');
		}
	}else{
		message.reply('Vous n\'avez pas l\'autorisation de bannir des utilisateurs');
	}
  }
});

//fake banne 
bot.on('message', message => {
  if (!message.guild) return;

  if (message.content.startsWith(prefix + 'fake-ban') || message.content.startsWith(prefix + 'fb')) {
		const user = message.mentions.users.first();
		if (user) {
		  const member = message.guild.member(user);
		  if (member) {
			const embed = new RichEmbed()
			  .setTitle('Bannisement (fake)')
			  .setColor('RED')
			  .setDescription(`**${user.tag}** a bien été banni par **${message.author.tag}**`)
			  .setFooter(`Ban fake par ${message.author.tag}`)
			  .setTimestamp();
			message.channel.send(embed);
		  } else {
			message.reply('Ce membre n\'est pas du serveur');
		  }
		} else {
		  message.reply('Vous n\'avez pas mentionner l\'ultisateur à banne');
		}
  }
});


//help
bot.on('message', message => {
  if (message.content === prefix + 'help') {
	message.channel.bulkDelete(1)
	
	const embed = new RichEmbed()
      .setTitle('Commandes classiques')
      .setColor('AQUA')
	  .setDescription('Dire bonjour au bot : **'+prefix+'bonjour** \n\ Envoyer une annonce : **'+prefix+'send** [**contenu**] \n\ Faire un sondage : **'+prefix+'sondage** [**question**] \n\ Information sur le serveur : **'+prefix+'serv-info** \n\ Membres sur le serveur : **'+prefix+'member-count** \n\ Information sur le bot : **'+prefix+'bot-info** \n\ Ban un membre (fake) : **'+prefix+'fake-ban** [**membre**] \n\ Kick un membre (fake) : **'+prefix+'fake-kick** [**membre**] \n\ ')
	  .setFooter(`Demandé par: ${message.author.tag}`)
	  .setTimestamp();
	message.channel.send(embed);
	
	const embedd = new RichEmbed()
      .setTitle('Commandes modérateurs')
      .setColor('ORANGE')
	  .setDescription('Renseignements sur un membre : **'+prefix+'user-info** [**membre**] \n\ Supprimer des messages : **'+prefix+'suppr** [**nombre de message**]  \n\ Expulser un membre : **'+prefix+'kick** [**membre**] \n\ Bannir un membre : **'+prefix+'ban** [**membre**] \n\ \n\ ')
		.setFooter(`Demandé par: ${message.author.tag}`)
			.setTimestamp();
	message.channel.send(embedd);
  }
});
