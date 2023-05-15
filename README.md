# Uchu bot

Simple discord bot for moderation and sentiment analysis

## Description

An in-depth paragraph about your project and overview of use.

## Getting Started

### Dependencies

Tested on:
* node v18.16.0
* npm 9.5.1
* Garuda Linux 6.2.13-zen-1-zen (x86_64)

### Installing

* Clone the repo
* Install dependencies
```
npm install
```
* Create `config.json` file in root directory
```
{
    "DISCORD_TOKEN": "YOUR_DISCORD_TOKEN",
    "ADMIN_ID": "YOUR_DISCORD_ID"
}
```

### Running

```
npm start
```

## Usage

```
/stop - stop the bot
/settrainingchannel - set the channel for training the sentiment analysis model
/ping - Check if the bot is alive
/prune `n` - Delete `n` messages from the channel
```

### Using the sentiment analysis

* Set the training channel with `/settrainingchannel`
* Send a message in any channel on the Guild
* Check the training channel and tag as appropriate
* The bot will automatically train abd save the model

It's recommended to have at least 30 messages per tag for the model even be remotely accurate.

## Help

At this stage the bot is not ready for public use. If you want to use it, you will have to host it yourself.

## Authors

Contributors names and contact info

RealFireAU - [@RealFireAU](https://github.com/RealFireAU)

## Version History

* 0.1
    * Initial Release

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [discord.js](https://discord.js.org/#/)
* [natural](https://github.com/NaturalNode/natural/)