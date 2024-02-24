const { Events, WebhookClient, EmbedBuilder } = require('discord.js');
const { webhook } = require('../config/config');
const webhookClient = new WebhookClient({ id: webhook.id, token: webhook.token });

module.exports = async (client) => {
  client.on(Events.Error, async (error) => {
    webhookClient.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Red')
        .setTitle('Client Error')
        .setDescription(`Error Description\n\`${error}\``)
        .setFooter({ text: 'Date' })
        .setTimestamp()
      ]
    });
  });

  client.on(Events.Debug, async (debug) => {
    webhookClient.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Yellow')
        .setTitle('Client Debug')
        .setDescription(`Debug Description\n\`${debug}\``)
        .setFooter({ text: 'Date' })
        .setTimestamp()
      ]
    });
  });

  client.on(Events.Warn, async (warn) => {
    webhookClient.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Yellow')
        .setTitle('Client Warning')
        .setDescription(`Warning Description\n\`${warn}\``)
        .setFooter({ text: 'Date' })
        .setTimestamp()
      ]
    });
  });

  client.on('unhandledRejection', (reason, promise) => {
    webhookClient.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Red')
        .setTitle('unhandled Rejection')
        .setDescription(`Error Details\nReason: \`${reason}\`\nPromise: \`${promise}\``)
        .setFooter({ text: 'Date' })
        .setTimestamp()
      ]
    });
  });

  process.on('uncaughtExceptionMonitor', async (error, origin) => {
    webhookClient.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Red')
        .setTitle('uncaught Exception Monitor')
        .setDescription(`Error Details\nError: \`${error}\`\nOrigin: \`${origin}\``)
        .setFooter({ text: 'Date' })
        .setTimestamp()
      ]
    });
  });

  process.on('uncaughtException', async (error) => {
    webhookClient.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Red')
        .setTitle('uncaught Exception')
        .setDescription(`Error Details\nError: \`${error}\``)
        .setFooter({ text: 'Date' })
        .setTimestamp()
      ]
    });
  });

  process.on('rejectionHandled', async (promise) => {
    webhookClient.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Red')
        .setTitle('rejection Handled')
        .setDescription(`Error Details\nPromise: \`${promise}\``)
        .setFooter({ text: 'Date' })
        .setTimestamp()
      ]
    });
  });

  process.on('multipleResolves', async (type, promise, reason) => {
    webhookClient.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Red')
        .setTitle('multiple Resolves')
        .setDescription(`Error Details\nType: \`${type}\`\nPromise: \`${promise}\`\nReason: \`${reason}\``)
        .setFooter({ text: 'Date' })
        .setTimestamp()
      ]
    });
  });

  process.on('warning', async (warning) => {
    webhookClient.send({
      embeds: [
        new EmbedBuilder()
        .setColor('Yellow')
        .setTitle('Warning')
        .setDescription(`Warning Description\n\`${warning}\``)
        .setFooter({ text: 'Date' })
        .setTimestamp()
      ]
    });
  });
};