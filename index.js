const Discord = require('discord.js');
const NineGag = require('./lib/9gag/index');
const Scraper = new NineGag.Scraper(1);

const bot = new Discord.Client();

bot.on('ready', function () {
    bot.user.setPresence({
        status: 'online',
        afk: false,
        game: {
            name: '9Gag'
        }
    }).catch(console.error);
});

bot.login('INSERT YOUR TOKEN HERE');

bot.on('message', (message) => {
    if(message.author.id !== bot.user.id){

        if (message.content.includes('https://9gag.com/') || message.content.includes('http://9gag.com/') || message.content.includes('http://m.9gag.com/') || message.content.includes('https://m.9gag.com/')) {
            let messageSplited = message.content.split(' ');
            let urlPost = messageSplited[messageSplited.length - 1];
            let urlSplited = urlPost.split('/');
            let postId = urlSplited[urlSplited.length - 1];

            try {
                Scraper.scrap(postId).then((posts) => {
                    let post = posts[0];
                    message.reply(post.title, {
                        file: post.content
                    });
                    message.delete();
                });
            }
            catch (err) {
                console.error(err);
                message.reply("I don't like this link :c");
            }
        }
    }
});