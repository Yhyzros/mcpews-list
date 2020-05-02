const WebSocket = require('ws');//需要使用npm i ws进行安装
const crypto = require('crypto');//依赖项
const fs = require('fs');//依赖项
const uuid = () =>([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>(c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16));//uuid
const wss = new WebSocket.Server({ port: 17439 });
//End for it.
console.log('Server is running at 127.0.0.1:17439.');//服务器运行在本地端口.
console.log('Author by Yhyzros.');

wss.on('connection', (ws) =>{
    ws.send(JSON.stringify({
        body: {
            eventName: 'PlayerMessage'
        },
        header: buildHeader('subscribe')
    }));
    //定义command↓
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
//定义结束
    //msg↓
    ws.on("message",(msg) =>{
        console.log('onMessgae:', msg);
        if(JSON.parse(msg).body.eventName == "PlayerMessage"){
            /*设定玩家触发词*/let say = JSON.parse(msg).body.properties.Message;//msg
            /*截取玩家触发词后的字符串*/let str = message.split(' ');//split
            let sender = JSON.parse(msg).body.properties.Sender;//sender
            /*定义cmd功能执行*/let CarryCommand = 'Null';
            //console.log(`${sender} says ${say}`);
    /*功能测试触发词(say)*/if(say == 'PlayerMessageTest'){
        /*发送命令*/command('say Tested!!');
    };

    /*执行功能命令*/if(str == 'exec '){
        /*设为截取触发词后的命令*/CarryCommand = msg.substring(5,1000);
        /*输出命令*/command(CarryCommand);
        /*告诉玩家输出的命令*/command('say command:' + CarryCommand);
    }
        }
    })
});//Server end.

   /*消息返回到uuid库↓*/
   function buildHeader(purpose){
        return{
            version: 1,
            requestId: uuid(),
            messagePurpose: purpose,
            messageType:'commandRequest'
        }
   }
//End
