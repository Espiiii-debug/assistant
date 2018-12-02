const Discord = require('discord.js')
const { Client, RichEmbed } = require('discord.js')
const bot = new Discord.Client()
const token = process.env.token;
const cfg = require('./index.json')
var prefix = ("a!")
var websit = ("https://sites.google.com/view/assistant-bot")

//version normal
bot.login(cfg.token)

bot.on('ready', () => {
  console.log('Utilise moi!');
});

//version test
// bot.login("NTE4NDQ2MDQ4MTYzOTIxOTIx.DuQ4dQ.F7NUlYKoa-LixDQVE8CaZDUzMrQ")

bot.on ('ready', function (){
	bot.user.setGame(prefix + 'help '/* || ERREUR member count*/).catch(console.error)
})

bot.on('guildMemberAdd', member =>{
	bot.user.setGame(prefix + 'help '/*|| '+member.guild.memberCount+' membres'*/).catch(console.error)
})

bot.on('guildMemberRemove', member =>{
	bot.user.setGame(prefix + 'help '/*|| '+member.guild.memberCount+' membres'*/).catch(console.error)
})

// commandes
bot.on('message', function (message){
	
	if(message.content.startsWith(prefix + "bonjour") || message.content.startsWith(prefix + "bjr") || message.content.startsWith(prefix + "slt")){
		const user = message.mentions.users.first();
		/*const embed = new RichEmbed()
			.setTitle('Bonjour')
			.setColor('GREEN')
			.setDescription('que puis-je pour vous ? (|help pour voir les commandes)');
			message.channel.send(embed);*/
		message.reply('bonjour, que puis-je pour vous ? ( **'+prefix+'help** pour voir les commandes )')
	}
/*	
	if(message.content.startsWith(prefix + "setup-member-count") || message.content.startsWith(prefix + "smc")){
		/*if(message.channel.permissionsFor(message.member).hasPermission("MANAGE_CHANNELS")){
			message.guild.createChannel('Member count: '+message.guild.memberCount, 'voice')
				.then(console.log)
				.catch(console.error);
			message.reply('le salon member count a bien été créé')
		}else{
		message.reply('Vous n\'avez pas l\'autorisation d\'ajouter des salons');
		}*//*
		bot.user.setGame(prefix + 'help || '+message.guild.memberCount+' membres').catch(console.error)
		message.reply('le member count a bien été mis à jour.')
	} */
	
	if(message.content.startsWith(prefix + "setup-cmd") || message.content.startsWith(prefix + "cmd")){
		if(message.channel.permissionsFor(message.member).hasPermission("MANAGE_CHANNELS")){
			message.guild.createChannel('assistant--cmd', 'text')
				.then(console.log)
				.catch(console.error);
			message.reply('le salon **assistant--cmd** a bien été créé')
			
			const embed = new RichEmbed()
				.setColor('BLUE')
				.setDescription('c\'est dans le salon #assistant--cmd que vous pourrez executer des commandes sans encombrer les salons de tchat. (Je vous conseille de bloquer l\'accés au autres utilisateurs)')
				.setFooter(`Message automatique`)
				.setTimestamp();
			message.channel.send(embed);	
		}else{
		message.reply('Vous n\'avez pas l\'autorisation d\'ajouter des salons');
		}
	}
	
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
		message.channel.bulkDelete(1)
		const embed = new RichEmbed()
			.setAuthor(bot.user.username, bot.user.avatarURL)
			.setColor('NAVY')
			.setTitle("__Voici les informations sur le bot__")
			.setFooter(`Demandé par: ${message.author.tag}`)
			.setTimestamp()
			.addField(":crown: Créateur:", "@Дdяi1 🇷🇺#6623"/*, true*/)
			//.addField(":crown: Me supporter:", "", true)
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
	  }else{
		message.reply('Vous n\'avez pas l\'autorisation d\'expulser des utilisateurs');
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
			/**
			 * Ban the member
			 * Make sure you run this on a member, not a user!
			 * There are big differences between a user and a member
			 * Read more about what ban options there are over at
			 * https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=ban
			 */
			member.ban({
				
			  reason: 'They were bad!',
			}).then(() => {
				message.channel.bulkDelete(1)
			  message.reply(`le membre **${user.tag}** a bien été banni`);
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

//help
bot.on('message', message => {
  if (message.content === prefix + 'help') {
	message.channel.bulkDelete(1)
	
	const embed = new RichEmbed()
      .setTitle('Commandes classiques')
      .setColor('AQUA')
	  //.addField("N'oubliez pas le préfixe "+prefix+" avant votre commande d'invocation", "Bientôt personnalisable !")
	  .setDescription('Dire bonjour au bot : **'+prefix+'bonjour** \n\ Envoyer une annonce : **'+prefix+'send** [**contenu**] \n\ Faire un sondage : **'+prefix+'sondage** [**question**] \n\ Information sur le serveur : **'+prefix+'serv-info** \n\ Membres sur le serveur : **'+prefix+'member-count** \n\ Information sur le bot : **'+prefix+'bot-info** \n\ '/* Mettre à jour le nombre de membres affichés sur le bot : **'+prefix+'setup-member-count** */ \n\ \n\ ')
	  .setFooter(`Demandé par: ${message.author.tag}`)
	  .setTimestamp();
	message.channel.send(embed);
	
	const embedd = new RichEmbed()
      .setTitle('Commandes modérateurs')
      .setColor('ORANGE')
	  //.addField("N'oubliez pas le préfixe "+prefix+" avant votre commande d'invocation", "Bientôt personnalisable !")
	  .setDescription('Renseignements sur un membre : **'+prefix+'user-info** [**membre**] \n\ Supprimer des messages : **'+prefix+'suppr** [**nombre de message**]  \n\ Expulser un membre : **'+prefix+'kick** [**membre**] \n\ Bannir un membre : **'+prefix+'ban** [**membre**] \n\ Zone de Commmandes : **'+prefix+'setup-cmd** \n\ \n\ ')
		.setFooter(`Demandé par: ${message.author.tag}`)
			.setTimestamp();
	message.channel.send(embedd);
  }
});
