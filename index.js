// Importation de la bibliothèque Discord.js
const Discord = require('discord.js');

// Initialisation du client Discord
const client = new Discord.Client();

// Token du bot Discord (à remplacer par votre propre token)
const token = 'MTA3NjY0NDY5OTM5OTUyMDI2Ng.GHkzQH.tkzzmtZJfygjT5QkefpLCS1JfbH6P6OdH17PjI';

// Préfixe de commande
const prefix = '!';

// Événement de connexion du bot Discord
client.on('ready', () => {
  console.log(`Connecté en tant que ${client.user.tag}`);
});

// Événement de réception de message
client.on('message', async message => {
  // Vérification si le message provient d'un bot ou ne commence pas par le préfixe de commande
  if (message.author.bot || !message.content.startsWith(prefix)) {
    return;
  }

  // Suppression du préfixe de commande et séparation des arguments
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // Commande "service"
  if (command === 'service') {
    // Vérification si le nom, la description et le message du salon sont spécifiés
    if (args.length < 3) {
      return message.reply('Veuillez spécifier un nom, une description et un message pour le service');
    }

    // Extraction des arguments
    const serviceName = args[0];
    const serviceDescription = args.slice(1, -1).join(' ');
    const serviceMessage = args.slice(-1)[0];

    try {
      // Création du salon avec le nom et la description spécifiés
      const channel = await message.guild.channels.create(serviceName, {
        type: 'text',
        parent: message.channel.parent, // parent du salon (facultatif)
        topic: serviceDescription, // description du salon (facultatif)
        permissionOverwrites: [{ // permissions du salon (facultatif)
          id: message.guild.roles.everyone.id,
          deny: ['SEND_MESSAGES', 'ADD_REACTIONS']
        }]
      });

      // Envoi du message dans le salon créé
      channel.send(serviceMessage);

      // Message de confirmation de la création du salon
      message.reply(`Le salon ${channel} a été créé avec la description "${serviceDescription}" et le message suivant :\n${serviceMessage}`);
    } catch (error) {
      // Message d'erreur en cas d'échec de la création du salon
      console.error(error);
      message.reply('Erreur lors de la création du salon');
    }
  }

  // Commande "help"
  if (command === 'help') {
    // Création de l'embed d'aide
    const helpEmbed = new Discord.MessageEmbed()
      .setTitle('Aide du bot Discord')
      .setColor('#00ff00')
      .addField('!service [nom] [description] [message]', 'Créer un salon avec le nom, la description et le message spécifiés', true)
      .addField('!help', 'Afficher cette aide', true);

    // Envoi de l'embed d'aide
    message.channel.send(helpEmbed);
  }
});

// Connexion du bot Discord
client.login(token);
