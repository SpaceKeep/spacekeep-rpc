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
let startTime = null;

function setActivity(details, state, smallImageKey, smallImageText, partySize, elapsed) {
  const activity = {
    details,
    state,
    largeImageKey: 'spacekeep_logo',
    largeImageText: 'SpaceKeep Infrastructure',
    buttons: [
      { label: 'Dashboard', url: 'https://spacekeep.dev' },
      { label: 'GitHub Org', url: 'https://github.com/SpaceKeep' }
    ],
    instance: false
  };

  if (smallImageKey || process.env.SMALL_IMAGE_KEY) {
    activity.smallImageKey = smallImageKey || process.env.SMALL_IMAGE_KEY;
    activity.smallImageText = smallImageText || process.env.SMALL_IMAGE_TEXT;
  }

  if (partySize) {
    const [current, max] = partySize.split('/').map(Number);
    if (!isNaN(current) && !isNaN(max)) {
      activity.partySize = current;
      activity.partyMax = max;
    }
  }

  if (elapsed) {
    activity.startTimestamp = startTime || Date.now();
  }

  currentActivity = { details, state, smallImageKey, smallImageText, partySize, elapsed };
  client.setActivity(activity);
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
  .option('--icon <key>', 'Discord asset key for the small image')
  .option('--icon-text <text>', 'Tooltip text for the small image')
  .option('--follow', 'Automatically update status when you start playing a game on Discord')
  .option('--elapsed', 'Show elapsed time since starting the broadcast')
  .option('--party <size>', 'Show party size (format: current/max, e.g. 1/4)')
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

    startTime = Date.now();

    client.once('ready', () => {
      isConnected = true;

      if (options.game) {
        setActivity(`Playing ${options.game}`, options.state, options.icon, options.iconText, options.party, options.elapsed);
        console.log(`Broadcasting: Playing ${options.game}${options.party ? ` (party: ${options.party})` : ''}${options.elapsed ? ' [elapsed]' : ''}`);
      } else {
        setActivity(options.details, options.state, options.icon, options.iconText, options.party, options.elapsed);
        console.log(`Successfully initialized SpaceKeep RPC broadcast (env: ${envPath || 'none'}).`);
      }

      if (options.follow) {
        console.log('Following game activity...');
        client.on('presenceUpdate', (_, presence) => {
          const game = presence.activities?.find((a) => a.type === 0 && a.name);
          if (game) {
            setActivity(`Playing ${game.name}`, options.state, options.icon, options.iconText, options.party, options.elapsed);
            console.log(`Now playing: ${game.name}`);
          } else if (currentActivity?.details?.startsWith('Playing ')) {
            setActivity(options.details, options.state, options.icon, options.iconText, options.party, options.elapsed);
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
      if (currentActivity) {
        console.log(`Activity: ${currentActivity.details || 'none'}${currentActivity.state ? ' - ' + currentActivity.state : ''}`);
        if (currentActivity.partySize) console.log(`Party: ${currentActivity.partySize}/${currentActivity.partyMax}`);
        if (currentActivity.elapsed) console.log(`Elapsed: ${Math.floor((Date.now() - startTime) / 1000)}s`);
      }
      process.exit(0);
    }

    console.log('Status: Not broadcasting.');
    console.log(`Client ID: ${CLIENT_ID}`);
    console.log(`Env file: ${envPath || 'none detected'}`);
    process.exit(0);
  });

program.parse(process.argv);
