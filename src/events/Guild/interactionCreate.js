const { Events, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, PermissionFlagsBits  } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const moment = require('moment');
const sourcebin = require('sourcebin_js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    // Run Code
    if(interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if(!command) {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setColor('Red')
            .setDescription(`Perintah \`${interaction.commandName}\` tidak ditemukan.`)
          ],
          ephemeral: true
        });
        return;
      };
  
      try {
        await command.execute(interaction)
      } catch (error) {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setColor('Red')
            .setDescription(`Terjadi kesalahan ketika menjalankan \`${interaction.commandName}\`.`)
          ],
          ephemeral: true
        });
        console.log(error);
      };
    };

    // Select Menu
    if(interaction.isStringSelectMenu()) {
      switch(interaction.values[0]) {
        case 'prize': {
          await interaction.guild.channels.create({
            name: `ticket-${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: '1197551530874769530',
            permissionOverwrites: [
              {
                id: interaction.guild.roles.everyone,
                deny: [PermissionFlagsBits.ViewChannel]
              },
              {
                id: interaction.user.id,
                allow: [PermissionFlagsBits.ViewChannel]
              },
            ],
          }).then(async(channel) => {
            await channel.send({
              embeds: [
                new EmbedBuilder()
                .setTitle('Klaim Hadiah')
                .setColor('Green')
                .setDescription('Dimohon untuk tag penyelenggara event tersebut untuk mengclaim hadiah tersebut!')
                .setFooter({ text: 'Harap jangan mainkan tiket!', iconURL: interaction.client.user.displayAvatarURL({ extension: 'png'}) })
              ],
              components: [
                new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                  .setCustomId('close')
                  .setLabel('Tutup')
                  .setEmoji('🔒')
                  .setStyle(ButtonStyle.Danger),
                  new ButtonBuilder()
                  .setCustomId('close-with-reason')
                  .setLabel('Tutup Dengan Alasan')
                  .setEmoji('🔒')
                  .setStyle(ButtonStyle.Danger),
                  new ButtonBuilder()
                  .setCustomId('claim')
                  .setLabel('Klaim')
                  .setEmoji('🙋‍♂️')
                  .setStyle(ButtonStyle.Success)
                )
              ]
            }).then(async (msg) => {
              await db.set(`channel-ticket-${channel.id}`, channel.id);
              await db.set(`ticket-author-${channel.id}`, interaction.user.id);
              await db.set(`ticket-message-${channel.id}`, msg.id);

              interaction.reply({
                embeds: [
                  new EmbedBuilder()
                  .setTitle('Tiket')
                  .setColor('Green')
                  .setDescription(`Berhasil membuat tiket di ${channel}`)
                  .setFooter({ text: 'Harap jangan mainkan tiket!', iconURL: interaction.client.user.displayAvatarURL({ extension: 'png' }) })
                ],
                ephemeral: true
              });
            });
          });
        } break;
        case 'help': {
          await interaction.guild.channels.create({
            name: `ticket-${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: '1197551530874769530',
            permissionOverwrites: [
              {
                id: interaction.guild.roles.everyone,
                deny: [PermissionFlagsBits.ViewChannel]
              },
              {
                id: interaction.user.id,
                allow: [PermissionFlagsBits.ViewChannel]
              },
            ],
          }).then(async(channel) => {
            await channel.send({
              embeds: [
                new EmbedBuilder()
                .setTitle('Tiket Bantuan')
                .setColor('Green')
                .setDescription('Terimah kasih sudah melapor.\nJelaskan keluhanmu dan tunggu jawaban dari staff kami!')
                .setFooter({ text: 'Harap jangan mainkan tiket!', iconURL: interaction.client.user.displayAvatarURL({ extension: 'png'}) })
              ],
              components: [
                new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                  .setCustomId('close')
                  .setLabel('Tutup')
                  .setEmoji('🔒')
                  .setStyle(ButtonStyle.Danger),
                  new ButtonBuilder()
                  .setCustomId('close-with-reason')
                  .setLabel('Tutup Dengan Alasan')
                  .setEmoji('🔒')
                  .setStyle(ButtonStyle.Danger),
                  new ButtonBuilder()
                  .setCustomId('claim')
                  .setLabel('Klaim')
                  .setEmoji('🙋‍♂️')
                  .setStyle(ButtonStyle.Success)
                )
              ]
            }).then(async(msg) => {
              await db.set(`channel-ticket-${channel.id}`, channel.id);
              await db.set(`ticket-author-${channel.id}`, interaction.user.id);
              await db.set(`ticket-message-${channel.id}`, msg.id);

              interaction.reply({
                embeds: [
                  new EmbedBuilder()
                  .setTitle('Tiket')
                  .setColor('Green')
                  .setDescription(`Berhasil membuat tiket di ${channel}`)
                  .setFooter({ text: 'Harap jangan mainkan tiket!', iconURL: interaction.client.user.displayAvatarURL({ extension: 'png' }) })
                ],
                ephemeral: true
              });
            });
          });
        } break;
        case 'partner': {
          await interaction.guild.channels.create({
            name: `ticket-${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: '1197551530874769530',
            permissionOverwrites: [
              {
                id: interaction.guild.roles.everyone,
                deny: [PermissionFlagsBits.ViewChannel]
              },
              {
                id: interaction.user.id,
                allow: [PermissionFlagsBits.ViewChannel]
              },
            ],
          }).then(async(channel) => {
            await channel.send({
              embeds: [
                new EmbedBuilder()
                .setTitle('Partner Request')
                .setColor('Green')
                .setDescription('Dimohon untuk tag Partner Manager untuk melanjutkan Partner Request!')
                .setFooter({ text: 'Harap jangan mainkan tiket!', iconURL: interaction.client.user.displayAvatarURL({ extension: 'png'}) })
              ],
              components: [
                new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                  .setCustomId('close')
                  .setLabel('Tutup')
                  .setEmoji('🔒')
                  .setStyle(ButtonStyle.Danger),
                  new ButtonBuilder()
                  .setCustomId('close-with-reason')
                  .setLabel('Tutup Dengan Alasan')
                  .setEmoji('🔒')
                  .setStyle(ButtonStyle.Danger),
                  new ButtonBuilder()
                  .setCustomId('claim')
                  .setLabel('Klaim')
                  .setEmoji('🙋‍♂️')
                  .setStyle(ButtonStyle.Success)
                )
              ]
            }).then(async(msg) => {
              await db.set(`channel-ticket-${channel.id}`, channel.id);
              await db.set(`ticket-author-${channel.id}`, interaction.user.id);
              await db.set(`ticket-message-${channel.id}`, msg.id);

              interaction.reply({
                embeds: [
                  new EmbedBuilder()
                  .setTitle('Tiket')
                  .setColor('Green')
                  .setDescription(`Berhasil membuat tiket di ${channel}`)
                  .setFooter({ text: 'Harap jangan mainkan tiket!', iconURL: interaction.client.user.displayAvatarURL({ extension: 'png' }) })
                ],
                ephemeral: true
              });
            });
          });
        } break;
      };
    };

    // Button
    if(interaction.isButton()) {
      if(interaction.customId === 'verify') {
        if(interaction.member.roles.cache.has('1123057937217245217')) {
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
              .setColor('Red')
              .setDescription('<:failed:1197551581852356718>・**Kamu sudah verifikasi!**')
            ],
            ephemeral: true
          });
        } else {
          interaction.member.roles.add('1123057937217245217').then(async() => {
            interaction.client.channels.cache.get('1124611617166991402').send(`Halo ${interaction.user}! Selamat datang di server **${interaction.guild.name}**!`);

            interaction.reply({
              embeds: [
                new EmbedBuilder()
                .setColor('Green')
                .setDescription('<:success:1197551612537868409>・**Berhasil Verifikasi!**')
              ],
              ephemeral: true
            });
          }).catch((error) => {
            interaction.reply({
              embeds: [
                new EmbedBuilder()
                .setColor('Red')
                .setDescription('<:failed:1197551581852356718>・**Terjadi kesalahan, minta bantuan kepada <@1010474132753883207>.**')
              ],
              ephemeral: true
            });
            console.log(error)
          });
        };
      };

      if(interaction.customId === 'close') {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ extension: 'png', foceStatic: true }) })
            .setColor('Green')
            .setTitle('Konfirmasi Menutup')
            .setDescription('Harap konfirmasi jika anda ingin menutup tiket ini')
            .setFooter({ text: 'Harap jangan mainkan tiket!', iconURL: interaction.client.user.displayAvatarURL({ extension: 'png'}) })
          ],
          components: [
            new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setCustomId('confirm')
              .setEmoji('✔️')
              .setLabel('Tutup')
              .setStyle(ButtonStyle.Primary)
            )
          ]
        });
      };

      if(interaction.customId === 'confirm') {
        let ch = await db.get(`channel-ticket-${interaction.channel.id}`);
        let author = await db.get(`ticket-author-${ch}`);

        interaction.channel.messages.fetch().then(async(messages) => {
          output = Array.from(messages.values()).reverse().map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.username}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');
          let response;

          try {
            response = await sourcebin.create([
              {
                name: 'Ticket',
                content: output,
                languageId: 'text',
              }
            ], {
              title: `Chat transcript for ${interaction.channel.name}`,
              description: `The ticket of ${interaction.client.users.cache.get(author).username}`
            });
          } catch (e) {
            return console.log(e);
          };

          await interaction.channel.delete().then(async(deleted) => {
            db.delete(`channel-ticket-${deleted.id}`);

            let check = await db.get(`ticket-claimed-${deleted.id}`);
            let claimed = check  ? `${interaction.client.users.cache.get(check)}` : 'Tidak Diklaim';
            let res = await db.get(`ticket-reason-${deleted.id}`);
            let reason = res ? res : 'Tidak ada alasan yang ditentukan';
            let date = new Date();
              
            let user = await interaction.client.users.cache.get(author);
            try {
              user.send({
                embeds: [
                  new EmbedBuilder()
                  .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ extension: 'png', forceStatic: true }) })
                  .setTitle('Tiket Ditutup')
                  .setColor('Yellow')
                  .addFields(
                    { name: '<:opened:1207606769392549929> Dibuka Oleh', value: `${interaction.client.users.cache.get(author)}`, inline: true },
                    { name: '<:closed:1207606771590627339> Ditutup Oleh', value: `${interaction.user}`, inline: true },
                    { name: '<:claimed:1207606773964480532> Diklaim Oleh', value: `${claimed}`, inline: true },
                    { name: '<:reason:1207606776590245919> Alasan', value: `${reason}` }
                  )
                  .setFooter({ text: moment(date).format('MM/DD/YYYY h:mm A') })
                ]
              });
            } catch (e) {
              return;
            };

            interaction.guild.channels.cache.get('1207951160594530345').send({
              embeds: [
                new EmbedBuilder()
                .setColor('Yellow')
                .setTitle('Ticket Transcript')
                .addFields(
                  { name: '<:opened:1207606769392549929> Dibuka Oleh', value: `${interaction.client.users.cache.get(author)}`, inline: true },
                  { name: '<:closed:1207606771590627339> Ditutup Oleh', value: `${interaction.user}`, inline: true },
                  { name: '<:claimed:1207606773964480532> Diklaim Oleh', value: `${claimed}`, inline: true },
                  { name: '<:reason:1207606776590245919> Alasan', value: `${reason}` }
                )
                .setFooter({ text: moment(date).format('MM/DD/YYYY h:mm A') })
              ],
              components: [
                new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                  .setLabel('Transcript')
                  .setStyle(ButtonStyle.Link)
                  .setURL(response.url)
                )
              ]
            });
            
            await db.delete(`ticket-author-${deleted.id}`);
            await db.delete(`ticket-message-${deleted.id}`);
            await db.delete(`ticket-claimed-${deleted.id}`);
          })
        });
      };

      if(interaction.customId === 'close-with-reason') {
        let modal = new ModalBuilder()
        .setCustomId('close-with-reason')
        .setTitle('Tutup');

        let reason = new TextInputBuilder()
        .setCustomId('reason')
        .setLabel('Alasan')
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('Alasan untuk menutup tiket, contoh "Selesai"')
        .setMaxLength(1024);

        let row = new ActionRowBuilder().addComponents(reason);
        modal.addComponents(row);

        interaction.showModal(modal)
      };

      if(interaction.customId === 'claim') {
        let msg = await db.get(`ticket-message-${interaction.channel.id}`);
        let author = await db.get(`ticket-author-${interaction.channel.id}`);

        if(interaction.user.id == author) {
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
              .setColor('Red')
              .setTitle('Gagal!')
              .setDescription('Kamu tidak bisa klaim tiket milikmu sendiri!')
              .setFooter({ text: 'Harap jangan mainkan tiket!', iconURL: interaction.client.user.displayAvatarURL({ extension: 'png'}) })
            ],
            ephemeral: true
          });
        };

        let fetched = await interaction.guild.channels.cache.get(interaction.channel.id).messages.fetch(msg);
        fetched.edit({
          components: [
            new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setCustomId('close')
              .setLabel('Tutup')
              .setEmoji('🔒')
              .setStyle(ButtonStyle.Danger),
              new ButtonBuilder()
              .setCustomId('close-with-reason')
              .setLabel('Tutup Dengan Alasan')
              .setEmoji('🔒')
              .setStyle(ButtonStyle.Danger)
            )
          ]
        }).then(() => {
          interaction.reply({
            embeds: [
              new EmbedBuilder()
              .setColor('Green')
              .setTitle('Tiket Diklaim')
              .setDescription(`Tiket ini akan diambil alih oleh ${interaction.user}`)
              .setFooter({ text: 'Harap jangan mainkan tiket!', iconURL: interaction.client.user.displayAvatarURL({ extension: 'png'}) })
            ]
          });

          db.set(`ticket-claimed-${interaction.channel.id}`, interaction.user.id);
        });
      };
    };

    // Modal
    if(interaction.isModalSubmit()) {
      if(interaction.customId === 'close-with-reason') {
        let res = interaction.fields.getTextInputValue('reason');
        await db.set(`ticket-reason-${interaction.channel.id}`, res);

        let ch = await db.get(`channel-ticket-${interaction.channel.id}`);
        let author = await db.get(`ticket-author-${ch}`);

        await interaction.channel.delete().then(async(deleted) => {
          db.delete(`channel-ticket-${deleted.id}`);

          let check = await db.get(`ticket-claimed-${deleted.id}`);
          let claimed = check  ? `${interaction.client.users.cache.get(check)}` : 'Tidak Diklaim';
          let res = await db.get(`ticket-reason-${deleted.id}`);
          let reason = res ? res : 'Tidak ada alasan yang ditentukan';
          let date = new Date();

          let user = await interaction.client.users.cache.get(author);
          try {
            user.send({
              embeds: [
                new EmbedBuilder()
                .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ extension: 'png', forceStatic: true }) })
                .setTitle('Tiket Ditutup')
                .setColor('Yellow')
                .addFields(
                  { name: '<:opened:1207606769392549929> Dibuka Oleh', value: `${interaction.client.users.cache.get(author)}`, inline: true },
                  { name: '<:closed:1207606771590627339> Ditutup Oleh', value: `${interaction.user}`, inline: true },
                  { name: '<:claimed:1207606773964480532> Diklaim Oleh', value: `${claimed}`, inline: true },
                  { name: '<:reason:1207606776590245919> Alasan', value: `${reason}` }
                )
                .setFooter({ text: moment(date).format('MM/DD/YYYY h:mm A') })
              ]
            });
            
            await db.delete(`ticket-author-${deleted.id}`);
            await db.delete(`ticket-message-${deleted.id}`);
            await db.delete(`ticket-claimed-${deleted.id}`);
            await db.delete(`ticket-reason-${deleted.id}`);
          } catch (error) {
            return;
          };

          interaction.reply({ ephemeral: true });
        });
      };
    };
  },
};