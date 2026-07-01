#!/usr/bin/env node

const { Command } = require('commander');
const RPC = require('discord-rpc');
const program = new Command();

require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const client = new RPC.Client({ transport: 'ipc' });

program
  .name('spacekeep')
  .description('SpaceKeep CLI - The official tool for SpaceKeep infrastructure management.')
  .version('1.0.0');

program
  .command('start')
  .description('Initialize the SpaceKeep Rich Presence broadcast.')
  .action(() => {
    client.on('ready', () => {
      client.setActivity({
        details: "Building SpaceKeep",
        state: "v1.0.0-production",
        largeImageKey: "spacekeep_logo",
        largeImageText: "SpaceKeep Infrastructure",
        buttons: [
          { label: "Dashboard", url: "https://spacekeep.dev" },
          { label: "GitHub Org", url: "https://github.com/SpaceKeep" }
        ],
        instance: false
      });
      console.log('Successfully initialized SpaceKeep RPC broadcast.');
    });

    client.login({ clientId: CLIENT_ID }).catch(console.error);
  });

program
  .command('stop')
  .description('Terminate the active SpaceKeep broadcast.')
  .action(() => {
    client.destroy().then(() => {
        console.log('SpaceKeep RPC broadcast terminated.');
        process.exit(0);
    });
  });

program.parse(process.argv);