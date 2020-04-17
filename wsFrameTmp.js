const WebSocket = require('ws');
const crypto = require('crypto');
const fs = require('fs');
const uuid = () =>([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>(c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16));
const ip = '127.0.0.1';
const wss = new WebSocket.Server({ port: 17439 });
//End for it.
console.log('Server is running at '+ ip + ':17439.');
console.log('Author by Yhyzros.');
//subscribe.
wss.on('connection', (ws) =>{
    ws.send(JSON.stringify({
        body: {
            eventName: 'PlayerMessage'
        },
        header: buildHeader('subscribe')
    }));
    //Definition:command
    function command(cmd){
        ws.send(JSON.stringify({
            body:{
                origin:{
                    type:"player"
                },
                commandLine:cmd,
                version: 1 //version.
            },
            header: buildHeader('commandRequest')
        }));
    }
    ws.on("message",(msg) =>{
        console.log('onMessgae:', msg):
        if(JSON.parse(msg).body.eventName == "PlayerMessage"){
            let say = JSON.parse(msg).body.properties.Message;//msg
            let str = message.split(' ');//split
            let sender = JSON.parse(msg).body.properties.Sender;//sender
            let CarryCommand = 'Null';
            //console.log(`${sender} says ${say}`);
    if(say == 'PlayerMessageTest'){
        command('say Tested!!');
    };

    if(str == 'exec '){
        CarryCommand = msg.substring(5,1000);
        command(CarryCommand);
        command('say command:' + CarryCommand);
    }
        }
    })
});//Server end.

   function buildHeader(purpose){
        return{
            version: 1,
            requestId: uuid(),
            messagePurpose: purpose,
            messageType:'commandRequest'
        }
   }
