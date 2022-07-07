//import {RTMClient} from "@slack/rtm-api";
const { App } = require('@slack/bolt');
const axios = require('axios');
const dotenv = require('dotenv');
const jokes = {}
dotenv.config()

//Example interactive message 
//Tutorial: https://api.slack.com/messaging/interactivity
//Components: https://api.slack.com/block-kit/interactivity 

// Initializes your app with your bot token and signing secret
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    port: process.env.PORT || 3000
});

//SLASH COMMANDS
//rickroll
app.command("/rickroll", async ({ command, ack, say }) => {
    try {   
        await ack();
        say(`We\'re no strangers to love~ <@${command.user_id}> \n`);
        say({
            "blocks": [
                {
                    "type": "image",
                    "title": {
                      "type": "plain_text",
                      "text": "RickRoll"
                    },
                    "block_id": "image4",
                    "image_url": "https://media1.giphy.com/media/g7GKcSzwQfugw/200_d.gif?cid=67f10dfers5pu9eppbjpy0alfwqvm68b8xnaj2lweqrnc7ny&rid=200_d.gif&ct=g",
                    "alt_text": "Never gonna give you up"
                }
            ]
        })
    } catch (error) {
        console.log("Rickroll err");
        console.error(error);
    }
});
//hell
app.command("/hello", async ({ command, ack, say }) => {
    try {
      await ack();
      say(`Hello there! <@${command.user_id}> \n`);
    } catch (error) {
        console.log("hello err")
      console.error(error);
    }
});

//MESSAGE REPLIES
//Calm down
app.message(/^([a,A]+h)/, async ({ message, say }) => {
    try {
      say(`yo calm down <@${message.user}>\n`);
    } catch (error) {
        console.log("err")
      console.error(error);
    }
});

//Singback
app.message(/We('|’)*re no strangers to love/, async ({ message, say }) => {
    try {
      say(`<@${message.user}> You know the rules, and SO DO IIIIIIII\n`);
    } catch (error) {
        console.log("err")
      console.error(error);
    }
});
//I hate this game
app.message(/(I|i) hate this game/, async ({ message, say }) => {
    try {
      say(`<@${message.user}> You know the rules, and SO DO IIIIIIII\n`);
    } catch (error) {
        console.log("err")
      console.error(error);
    }
});
//Never gonna - give you up
app.message(/(N|n)+ever gonna/, async ({ message, say }) => {
    try {
       say(`<@${message.user}> give you up!\n`);
    } catch (error) {
        console.log("err")
      console.error(error);
    }
});

app.message(/([rR]ick\s)|(\s[rR]ick)/, async ({ message, say }) => {
    try {
      say(`yo <@${message.user}>\n`);
    } catch (error) {
        console.log("err")
      console.error(error);
    }
});

//HUMOR Modules
//Specifically puns
app.message(/pun/, async ({ message, say }) => {
    let jokeType = Math.random();
    if (jokeType > .5) {
        axios.get('https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single')
        .then (res => {
            try {
                say(`${res.data.joke}`)
            }
            catch (error)
            {
                console.log("err");
                console.error(error);
            }}    )
    } else {
        //10 puns total
        const puns = ["My sister once dated a guy with a wooden leg, but they broke it off.",
        "I kept trying to tell my friend that our Egypt trip was ruined by all that flooding, but she still insists that I was just in de-Nile.", 
        "An optimist will tell you that the average person is kind, but a mathematician knows the average person is quite mean.",
        "Just so everyone\'s clear\: I\'m about to put my glasses on.", 
        "\"Those who throw dirt are sure to lose ground\" -- Gandhi, probably. idk",
        "Best present I ever got was a broken drum set. Honestly, I don't know how I can beat that.",
        "I swear my uncle is the worst conductor ever. I asked him how many trains he has derailed, but he says it's hard to keep track.",
        "You know what? I think I\'m going to remove my spine. It's only holding me back!",
        "A veterinarian gently placed a rabbi up on the table. Then, petting him softly, the Vet announced \"We're just going to draw some blood to determine his blood type.\" To which the rabbi replied: \"I'm probably a Type O\"",
        "Axolotls are apparently the most inquisitive amphibians! They axolotl questions."];
        let punType = Math.floor(Math.random()*10);
        say( 
            {
                "channel": "ABCDEBF1",
                "attachments": [
                    {
                        "mrkdwn_in": ["text"],
                        "color": "#36a64f",
                        "pretext": puns[punType],
                        "title_link": "https://api.slack.com/",
                        "text": "This pun is Rick Jelte approved :thumbsup:",
                    }
                ]
        })

    }
});

//Tell a joke {normal, dad, cs, }
app.message(/joke/, async ({message,  say})  => {
    axios.get("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart")
        .then(res => {
            try {
                say(`${res.data.setup}\n${res.data.delivery}`);
            } catch(e) {
                console.log(e)
            }
        });
});

//GIF
app.message('gif', async ({message, say}) =>{
    say({
        "blocks": [
            {
                "type": "image",
                "title": {
                  "type": "plain_text",
                  "text": "RickRoll"
                },
                "block_id": "image4",
                "image_url": "https://media1.giphy.com/media/g7GKcSzwQfugw/200_d.gif?cid=67f10dfers5pu9eppbjpy0alfwqvm68b8xnaj2lweqrnc7ny&rid=200_d.gif&ct=g",
                "alt_text": "Never gonna give you up"
            }
        ]
    })
});

//Initiate dice game prompt
app.message('rickroll', async ({message, say}) =>{
    say("Welcome to the RickAndRoll Game!")
    say({
        "blocks": [
            {
                "type": "header",
                
                "text": {
                    "type": "plain_text",
                    "text": "Menu",
                    "emoji": true
                }
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": "*Would you like to play? *"
                    }
                ]
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "emoji": true,
                            "text": "Yes"
                        },
                        "value": "start",
                        "style": "primary",
                        "action_id": "start"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "emoji": true,
                            "text": "No, I am a boring person"
                        },
                        "style": "danger",
                        "value": "cancel",
                        "action_id": "cancel"
                    }
                ]
            }
        ]
    })
});

//Start dice game
app.action('start',async({ack, client, body, logger,say})=>{
    await ack();
    const result = await client.views.open({
        // Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id: body.trigger_id,
        // View payload
        view: {
            type: 'modal',
            // View identifier
            callback_id: 'view_2',
            title: {
            type: 'plain_text',
            text: 'RickAndRoll Time!'
            },
            blocks: [
            {
                type: 'section',
                text: {
                type: 'mrkdwn',
                text: 'Welcome to a RickAndRoll modal w/ Rick!'
                },
            },
            {
                type: "actions",
                block_id: "actions2",
                elements:[
                {
                    type: "button",
                    text: {
                        type: "plain_text",
                        text: "Play Now"
                    },
                    action_id: "startgame",
                    style: "primary",
                    value: "click_me_123"
                }
                ]
            }
            ],
            }
          });
        logger.info(result);
 });

 //Cancel dice game
app.action('cancel', async({ack, say}) => {
    await ack()
    say("Booooo you're no fun :slightly_frowning_face:");
});

//Play dice game
app.action("startgame", async({ack, client, context, body, logger}) => {
    await ack()
    console.log("startgame")
    let [myRoll, rickRoll, gameResult, imageURL] = playGame(body.user.name);
    
    try {
        // Call views.update with the built-in client
        const result = await client.views.update({
          // Pass the view_id
          view_id: body.view.id,
          // Pass the current hash to avoid race conditions
          hash: body.view.hash,
          // View payload with updated blocks
          view: {
            type: 'modal',
            // View identifier
            callback_id: 'view_1',
            title: {
              type: 'plain_text',
              text: 'Game Results!'
            },
            blocks: [
              {
                type: 'section',
                text: {
                  type: 'plain_text',
                  text:  `Your Roll: ${myRoll}\n`+
                         `Rick's Roll: ${rickRoll}`
                }
              },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: gameResult
                    }
                },
                {
                    type: "image",
                    image_url: imageURL,
                    alt_text: "Never gonna give you up"
                }
            ]
          }
        });
        logger.info(result);
      }
      catch (error) {
        logger.error(error);
      }
    
});

function playGame(user_name){
   
    let myRoll = Math.floor(Math.random() * 6 + 1)
    let rickRoll = Math.floor(Math.random() * 6 + 1)

    let result = ""
    let imgURL = ""
    
    if(myRoll > rickRoll){
        result = `<@${user_name}> wins!`
        imgURL = 'https://c.tenor.com/h0xd6g-yTIEAAAAC/rick-astley-rick-astley-crying.gif'
        
    }
    else if(myRoll === rickRoll){
        result = `Its a tie!`
        imgURL = 'https://i.ytimg.com/vi/CrWdF0nIM-c/mqdefault.jpg'
    }
    else{
        result = 'Rick Wins!'
        imgURL = 'https://media1.giphy.com/media/g7GKcSzwQfugw/200_d.gif?cid=67f10dfers5pu9eppbjpy0alfwqvm68b8xnaj2lweqrnc7ny&rid=200_d.gif&ct=g'
    }

    return [myRoll, rickRoll, result, imgURL]
}

(async () => {
    // Start your app
    console.log("Bolt app is running")
    await app.start(process.env.PORT || 3000); 
})();








/*
 
app.message('PTO', async ({message, say}) =>{
    say({
        "blocks": [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": "New request",
                    "emoji": true
                }
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": "*Type:*\nPaid Time Off"
                    },
                    {
                        "type": "mrkdwn",
                        "text": `*Created by:*\n<@${message.user}>`
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": "*When:*\nAug 10 - Aug 13"
                    }
                ]
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "emoji": true,
                            "text": "Approve"
                        },
                        "style": "primary",
                        "value": "click_me_123",
                        "action_id": "test"
                        
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "emoji": true,
                            "text": "Reject"
                        },
                        "style": "danger",
                        "value": "click_me_123"
                    }
                ]
            }
        ]
    })
});

app.action('test',async({ack, client, body, logger})=>{
    await ack();
    const result = await client.views.open({
        // Pass a valid trigger_id within 3 seconds of receiving it
        trigger_id: body.trigger_id,
        // View payload
        view: {
          type: 'modal',
          // View identifier
          callback_id: 'view_1',
          title: {
            type: 'plain_text',
            text: 'Modal title'
          },
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: 'Welcome to a modal with _blocks_'
              },
              accessory: {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Click me!'
                },
                action_id: 'button_abc'
              }
            },
            {
              type: 'input',
              block_id: 'input_c',
              label: {
                type: 'plain_text',
                text: 'What are your hopes and dreams?'
              },
              element: {
                type: 'plain_text_input',
                action_id: 'dreamy_input',
                multiline: true
              },
            },
            {
                type: "actions",
                block_id: "actions1",
                elements:[
                {
                    type: "button",
                    text: {
                        type: "plain_text",
                        text: "Update"
                    },
                    action_id: "update",
                    style: "danger",
                    value: "click_me_123"
                }
                ]
            }
          ],
          submit: {
            type: 'plain_text',
            text: 'Submit'
          }
          
        }
      });
      logger.info(result);
});

app.action('update', async({ack, client, body, logger})=>{
    await ack();
    try {
        // Call views.update with the built-in client
        const result = await client.views.update({
          // Pass the view_id
          view_id: body.view.id,
          // Pass the current hash to avoid race conditions
          hash: body.view.hash,
          // View payload with updated blocks
          view: {
            type: 'modal',
            // View identifier
            callback_id: 'view_1',
            title: {
              type: 'plain_text',
              text: 'Updated modal'
            },
            blocks: [
              {
                type: 'section',
                text: {
                  type: 'plain_text',
                  text: 'You updated the modal!'
                }
              },
              {
                type: 'image',
                image_url: 'https://media.giphy.com/media/SVZGEcYt7brkFUyU90/giphy.gif',
                alt_text: 'Yay! The modal was updated'
              }
            ]
          }
        });
        logger.info(result);
      }
      catch (error) {
        logger.error(error);
      }
    });
*/