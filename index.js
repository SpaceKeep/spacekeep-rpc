#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Command } = require('commander');
const RPC = require('discord-rpc');
const program = new Command();

const LOCAL_ENV = '.env';
const GLOBAL_ENV = path.join(require('os').homedir(), '.spacekeep.env');

function loadEnv() {
  const candidates = [LOCAL_ENV, GLOBAL_ENV];
  for (const file of candidates) {
    if (fs.existsSync(file)) {
      require('dotenv').config({ path: file });
      return file;
    }
  }
  return null;
}

const envPath = loadEnv();
const CLIENT_ID = process.env.CLIENT_ID;

const client = new RPC.Client({ transport: 'ipc' });
let isConnected = false;
let isDestroyed = false;
let currentActivity = null;

function setActivity(details, state, smallImageKey, smallImageText) {
  currentActivity = { details, state, smallImageKey, smallImageText };
  client.setActivity({
    details,
    state,
    largeImageKey: 'spacekeep_logo',
    largeImageText: 'SpaceKeep Infrastructure',
    smallImageKey: smallImageKey || process.env.SMALL_IMAGE_KEY || undefined,
    smallImageText: smallImageText || process.env.SMALL_IMAGE_TEXT || undefined,
    buttons: [
      { label: 'Dashboard', url: 'https://spacekeep.dev' },
      { label: 'GitHub Org', url: 'https://github.com/SpaceKeep' }
    ],
    instance: false
  });
}

program
  .name('spacekeep')
  .description('SpaceKeep CLI - The official tool for SpaceKeep infrastructure management.')
  .version('1.0.0');

program
  .command('start')
  .description('Initialize the SpaceKeep Rich Presence broadcast.')
  .option('--details <text>', 'Custom details text', 'Building SpaceKeep')
  .option('--state <text>', 'Custom state text', 'v1.0.0-production')
  .option('--game <name>', 'Set status to show you are playing a specific game')
  .option('--icon <key>', 'Discord asset key for the small image (game logo)')
  .option('--icon-text <text>', 'Tooltip text for the small image')
  .option('--follow', 'Automatically update status when you start playing a game on Discord')
  .action((options) => {
    if (isDestroyed) {
      console.error('Error: Client has been destroyed. Restart the process to broadcast again.');
      process.exit(1);
    }

    if (isConnected) {
      console.log('SpaceKeep RPC is already broadcasting.');
      return;
    }

    if (!CLIENT_ID) {
      console.error(`Error: CLIENT_ID is not defined.`);
      console.error(`Create a ${LOCAL_ENV} file or ${GLOBAL_ENV} with your Discord Client ID.`);
      console.error('You can find your Client ID in the Discord Developer Portal.');
      process.exit(1);
    }

    client.once('ready', () => {
      isConnected = true;

      if (options.game) {
        setActivity(`Playing ${options.game}`, options.state, options.icon, options.iconText);
        console.log(`Broadcasting: Playing ${options.game}${options.icon ? ` (icon: ${options.icon})` : ''}`);
      } else {
        setActivity(options.details, options.state, options.icon, options.iconText);
        console.log(`Successfully initialized SpaceKeep RPC broadcast (env: ${envPath || 'none'}).`);
      }

      if (options.follow) {
        console.log('Following game activity...');
        client.on('presenceUpdate', (_, presence) => {
          const game = presence.activities?.find((a) => a.type === 0 && a.name);
          if (game) {
            setActivity(`Playing ${game.name}`, options.state, options.icon, options.iconText);
            console.log(`Now playing: ${game.name}`);
          } else if (currentActivity?.details?.startsWith('Playing ')) {
            setActivity(options.details, options.state, options.icon, options.iconText);
            console.log('Stopped playing, reverted to default status.');
          }
        });
      }
    });

    client.on('disconnect', () => {
      isConnected = false;
      console.log('SpaceKeep RPC disconnected.');
    });

    client.login({ clientId: CLIENT_ID }).catch((err) => {
      console.error('Failed to connect to Discord:', err.message);
      process.exit(1);
    });
  });

program
  .command('stop')
  .description('Terminate the active SpaceKeep broadcast.')
  .action(() => {
    if (!isConnected) {
      console.log('SpaceKeep RPC is not currently broadcasting.');
      process.exit(0);
    }

    client.destroy()
      .then(() => {
        isConnected = false;
        isDestroyed = true;
        console.log('SpaceKeep RPC broadcast terminated.');
        process.exit(0);
      })
      .catch((err) => {
        console.error('Error stopping broadcast:', err.message);
        process.exit(1);
      });
  });

program
  .command('status')
  .description('Check if SpaceKeep CLI is running and connected.')
  .action(() => {
    if (!CLIENT_ID) {
      console.log('Status: CLIENT_ID not configured.');
      console.log(`Create ${LOCAL_ENV} or ${GLOBAL_ENV} with your Discord Client ID.`);
      process.exit(1);
    }

    if (isDestroyed) {
      console.log('Status: Destroyed (restart the process to broadcast again).');
      process.exit(0);
    }

    if (isConnected) {
      console.log('Status: Broadcasting.');
      console.log(`Env file: ${envPath || 'none detected'}`);
      console.log(`Client ID: ${CLIENT_ID}`);
      console.log(`Current activity: ${currentActivity?.details || 'none'}${currentActivity?.state ? ' - ' + currentActivity.state : ''}`);
      process.exit(0);
    }

    console.log('Status: Not broadcasting.');
    console.log(`Client ID: ${CLIENT_ID}`);
    console.log(`Env file: ${envPath || 'none detected'}`);
    process.exit(0);
  });

program.parse(process.argv);
