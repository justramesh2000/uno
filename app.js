var express = require('express');
var app = express();
const PORT = process.env.PORT || 5000
 
var server = require('http').createServer(app);

app.get('/',function(req, res) {
 res.sendFile(__dirname + '/dealer.html');
});

app.get('/player',function(req, res) {
 res.sendFile(__dirname + '/player.html');
});

app.use(express.static('resources'));

console.log("Server started.");
 
SOCKET_LIST = {};

players = [];
playedCards = [];
cards = ['80px-USM_Blue_0 copy.png',
'80px-USM_Blue_0.png',
'80px-USM_Blue_1 copy.png',
'80px-USM_Blue_1.png',
'80px-USM_Blue_2 copy.png',
'80px-USM_Blue_2.png',
'80px-USM_Blue_3 copy.png',
'80px-USM_Blue_3.png',
'80px-USM_Blue_4 copy.png',
'80px-USM_Blue_4.png',
'80px-USM_Blue_5 copy.png',
'80px-USM_Blue_5.png',
'80px-USM_Blue_6 copy.png',
'80px-USM_Blue_6.png',
'80px-USM_Blue_7 copy.png',
'80px-USM_Blue_7.png',
'80px-USM_Blue_8 copy.png',
'80px-USM_Blue_8.png',
'80px-USM_Blue_9 copy.png',
'80px-USM_Blue_9.png',
'80px-USM_Blue_Draw copy.png',
'80px-USM_Blue_Draw.png',
'80px-USM_Blue_Reverse copy.png',
'80px-USM_Blue_Reverse.png',
'80px-USM_Blue_Skip copy.png',
'80px-USM_Blue_Skip.png',
'80px-USM_Green_0 copy.png',
'80px-USM_Green_0.png',
'80px-USM_Green_1 copy.png',
'80px-USM_Green_1.png',
'80px-USM_Green_2 copy.png',
'80px-USM_Green_2.png',
'80px-USM_Green_3 copy.png',
'80px-USM_Green_3.png',
'80px-USM_Green_4 copy.png',
'80px-USM_Green_4.png',
'80px-USM_Green_5 copy.png',
'80px-USM_Green_5.png',
'80px-USM_Green_6 copy.png',
'80px-USM_Green_6.png',
'80px-USM_Green_7 copy.png',
'80px-USM_Green_7.png',
'80px-USM_Green_8 copy.png',
'80px-USM_Green_8.png',
'80px-USM_Green_9 copy.png',
'80px-USM_Green_9.png',
'80px-USM_Green_Draw copy.png',
'80px-USM_Green_Draw.png',
'80px-USM_Green_Reverse copy.png',
'80px-USM_Green_Reverse.png',
'80px-USM_Green_Skip copy.png',
'80px-USM_Green_Skip.png',
'80px-USM_Invincible copy 2.png',
'80px-USM_Invincible copy 3.png',
'80px-USM_Invincible copy.png',
'80px-USM_Invincible.png',
'80px-USM_Red_2 copy.png',
'80px-USM_Red_2.png',
'80px-USM_Red_3 copy.png',
'80px-USM_Red_3.png',
'80px-USM_Red_4 copy.png',
'80px-USM_Red_4.png',
'80px-USM_Red_5 copy.png',
'80px-USM_Red_5.png',
'80px-USM_Red_6 copy.png',
'80px-USM_Red_6.png',
'80px-USM_Red_7 copy.png',
'80px-USM_Red_7.png',
'80px-USM_Red_8 copy.png',
'80px-USM_Red_8.png',
'80px-USM_Red_9 copy.png',
'80px-USM_Red_9.png',
'80px-USM_Red_Draw copy.png',
'80px-USM_Red_Draw.png',
'80px-USM_Red_Reverse copy.png',
'80px-USM_Red_Reverse.png',
'80px-USM_Red_Skip copy.png',
'80px-USM_Red_Skip.png',
'80px-USM_Wild copy 2.png',
'80px-USM_Wild copy 3.png',
'80px-USM_Wild copy.png',
'80px-USM_Wild.png',
'80px-USM_Wild_Draw copy 2.png',
'80px-USM_Wild_Draw copy 3.png',
'80px-USM_Wild_Draw copy.png',
'80px-USM_Wild_Draw.png',
'80px-USM_Yellow_0 copy.png',
'80px-USM_Yellow_0.png',
'80px-USM_Yellow_1 copy.png',
'80px-USM_Yellow_1.png',
'80px-USM_Yellow_2 copy.png',
'80px-USM_Yellow_2.png',
'80px-USM_Yellow_3 copy.png',
'80px-USM_Yellow_3.png',
'80px-USM_Yellow_4 copy.png',
'80px-USM_Yellow_4.png',
'80px-USM_Yellow_5 copy.png',
'80px-USM_Yellow_5.png',
'80px-USM_Yellow_6 copy.png',
'80px-USM_Yellow_6.png',
'80px-USM_Yellow_7 copy.png',
'80px-USM_Yellow_7.png',
'80px-USM_Yellow_8 copy.png',
'80px-USM_Yellow_8.png',
'80px-USM_Yellow_9 copy.png',
'80px-USM_Yellow_9.png',
'80px-USM_Yellow_Draw copy.png',
'80px-USM_Yellow_Draw.png',
'80px-USM_Yellow_Reverse copy.png',
'80px-USM_Yellow_Reverse.png',
'80px-USM_Yellow_Skip copy.png',
'80px-USM_Yellow_Skip.png',
'Red0 copy.jpg',
'Red0.jpg',
'Red1 copy.jpg',
'Red1.jpg'
];

let playerId = 1;
let playerturnId = 1;

var io = require('socket.io')(server);
io.sockets.on('connection', function(socket){
        console.log('Connected');
        socket.on('playerRegister',function(data){
        	SOCKET_LIST[playerId] = socket;

            if(!(data== null))
            {
                players[playerId] = {id: playerId, name: data, cardCount:0, score:0, cards:[], playerTurn: false}; 
                console.log('added :' + players[playerId].name);        
            }
        
        for(var i in SOCKET_LIST){
            SOCKET_LIST[i].emit('addToPlayer', players,playerId);
          
            }
        	playerId++;
        });      
        socket.on('sendMsgToServer',function(data){
        
            console.log('someone sent a message!');
            for(var i in SOCKET_LIST){
            SOCKET_LIST[i].emit('addToChat', data);
            }
          
        });
 
        socket.on('disconnect',function(){
                  
            delete SOCKET_LIST[socket.id];
 
 });
 
 app.post('/shuffle/clicked', (req, res) => {
 	shuffle(cards);
 	console.log("cards have been shuffled");
 	res.sendStatus(200);
 });

 
 app.post('/uno/clicked', (req, res) => {
 	console.log("Uno was clicked");
 	res.sendStatus(200);
 });

 app.post('/check/clicked', (req, res) => {
 	console.log("Check was clicked");
 	res.sendStatus(200);
 });

function shuffle(array){
	console.log(array);
array.sort(() => Math.random() - 0.5);
console.log(array);
}

function distribute(cards, players)
{
	players = players.filter(function (el) {
  			return el != null;
			});
    //set first player to play 
    players[0].playerTurn = true;
	playerturnId = 1 ;
    console.log(playerturnId + ": Player turn");
    for (var i = 0; i < 7; i++)
    {
        for(var j=0; j < players.length ;j++)
        {
            players[j].cards.push(cards.shift());
            players[j].cardCount+=1;
        }
    }
    console.log("cards distributed");
}

function giveFromDeck(cards, players, playerName)
{
    players = players.filter(function (el) {
            return el != null;
            });
    if(playerName === "Dealer")
    {
        playedCards.push(cards.shift());
        playerturnId = 0 ;
        players[0].playerTurn = true;
    }
    else
    {
        var thisPlayer = players.find(play =>
        {
            return play.name === playerName ;
        }) ;
        
        thisPlayer.cards.push(cards.shift()) ;

        thisPlayer.cardCount +=1 ;
        thisPlayer.playerTurn = false;
        playerturnId +=1;
        if(playerturnId < players.length)
        {
            players[playerturnId].playerTurn = true;    
        }
        else
        {
          playerturnId = 0;  
          players[playerturnId].playerTurn = true; 
        }
        
    }
    
}

function play(players,playerName, cardplayed)
{
    if(playerName === "Dealer")
    {

    }
    else
    {
        players = players.filter(function (el) {
            return el != null;
            });

        console.log("card played is:" + cardplayed);

       var thisPlayer =  players.find(play =>
        {
            return play.name === playerName ;
        });

        var index = thisPlayer.cards.indexOf(cardplayed);
        if (index !== -1) thisPlayer.cards.splice(index, 1);
        playedCards.push(cardplayed);
        if(playedCards.length > players.length)
        {
            cards.push(playedCards.shift());  
        }
        thisPlayer.cardCount-=1;
        thisPlayer.playerTurn = false;
        playerturnId +=1;
        if(playerturnId < players.length)
        {
            players[playerturnId].playerTurn = true;    
        }
        else
        {
          playerturnId = 0;  
          players[playerturnId].playerTurn = true; 
        }
    }

}

function reset()
{
    cards = ['80px-USM_Blue_0 copy.png',
'80px-USM_Blue_0.png',
'80px-USM_Blue_1 copy.png',
'80px-USM_Blue_1.png',
'80px-USM_Blue_2 copy.png',
'80px-USM_Blue_2.png',
'80px-USM_Blue_3 copy.png',
'80px-USM_Blue_3.png',
'80px-USM_Blue_4 copy.png',
'80px-USM_Blue_4.png',
'80px-USM_Blue_5 copy.png',
'80px-USM_Blue_5.png',
'80px-USM_Blue_6 copy.png',
'80px-USM_Blue_6.png',
'80px-USM_Blue_7 copy.png',
'80px-USM_Blue_7.png',
'80px-USM_Blue_8 copy.png',
'80px-USM_Blue_8.png',
'80px-USM_Blue_9 copy.png',
'80px-USM_Blue_9.png',
'80px-USM_Blue_Draw copy.png',
'80px-USM_Blue_Draw.png',
'80px-USM_Blue_Reverse copy.png',
'80px-USM_Blue_Reverse.png',
'80px-USM_Blue_Skip copy.png',
'80px-USM_Blue_Skip.png',
'80px-USM_Green_0 copy.png',
'80px-USM_Green_0.png',
'80px-USM_Green_1 copy.png',
'80px-USM_Green_1.png',
'80px-USM_Green_2 copy.png',
'80px-USM_Green_2.png',
'80px-USM_Green_3 copy.png',
'80px-USM_Green_3.png',
'80px-USM_Green_4 copy.png',
'80px-USM_Green_4.png',
'80px-USM_Green_5 copy.png',
'80px-USM_Green_5.png',
'80px-USM_Green_6 copy.png',
'80px-USM_Green_6.png',
'80px-USM_Green_7 copy.png',
'80px-USM_Green_7.png',
'80px-USM_Green_8 copy.png',
'80px-USM_Green_8.png',
'80px-USM_Green_9 copy.png',
'80px-USM_Green_9.png',
'80px-USM_Green_Draw copy.png',
'80px-USM_Green_Draw.png',
'80px-USM_Green_Reverse copy.png',
'80px-USM_Green_Reverse.png',
'80px-USM_Green_Skip copy.png',
'80px-USM_Green_Skip.png',
'80px-USM_Invincible copy 2.png',
'80px-USM_Invincible copy 3.png',
'80px-USM_Invincible copy.png',
'80px-USM_Invincible.png',
'80px-USM_Red_2 copy.png',
'80px-USM_Red_2.png',
'80px-USM_Red_3 copy.png',
'80px-USM_Red_3.png',
'80px-USM_Red_4 copy.png',
'80px-USM_Red_4.png',
'80px-USM_Red_5 copy.png',
'80px-USM_Red_5.png',
'80px-USM_Red_6 copy.png',
'80px-USM_Red_6.png',
'80px-USM_Red_7 copy.png',
'80px-USM_Red_7.png',
'80px-USM_Red_8 copy.png',
'80px-USM_Red_8.png',
'80px-USM_Red_9 copy.png',
'80px-USM_Red_9.png',
'80px-USM_Red_Draw copy.png',
'80px-USM_Red_Draw.png',
'80px-USM_Red_Reverse copy.png',
'80px-USM_Red_Reverse.png',
'80px-USM_Red_Skip copy.png',
'80px-USM_Red_Skip.png',
'80px-USM_Wild copy 2.png',
'80px-USM_Wild copy 3.png',
'80px-USM_Wild copy.png',
'80px-USM_Wild.png',
'80px-USM_Wild_Draw copy 2.png',
'80px-USM_Wild_Draw copy 3.png',
'80px-USM_Wild_Draw copy.png',
'80px-USM_Wild_Draw.png',
'80px-USM_Yellow_0 copy.png',
'80px-USM_Yellow_0.png',
'80px-USM_Yellow_1 copy.png',
'80px-USM_Yellow_1.png',
'80px-USM_Yellow_2 copy.png',
'80px-USM_Yellow_2.png',
'80px-USM_Yellow_3 copy.png',
'80px-USM_Yellow_3.png',
'80px-USM_Yellow_4 copy.png',
'80px-USM_Yellow_4.png',
'80px-USM_Yellow_5 copy.png',
'80px-USM_Yellow_5.png',
'80px-USM_Yellow_6 copy.png',
'80px-USM_Yellow_6.png',
'80px-USM_Yellow_7 copy.png',
'80px-USM_Yellow_7.png',
'80px-USM_Yellow_8 copy.png',
'80px-USM_Yellow_8.png',
'80px-USM_Yellow_9 copy.png',
'80px-USM_Yellow_9.png',
'80px-USM_Yellow_Draw copy.png',
'80px-USM_Yellow_Draw.png',
'80px-USM_Yellow_Reverse copy.png',
'80px-USM_Yellow_Reverse.png',
'80px-USM_Yellow_Skip copy.png',
'80px-USM_Yellow_Skip.png',
'Red0 copy.jpg',
'Red0.jpg',
'Red1 copy.jpg',
'Red1.jpg'
];

    playedCards = [];
    playerturnId = 1;
    console.log("cards have been reset");
}

socket.on('shuffleCards',function(data){
        
            shuffle(cards);
            console.log('cards have been shuffled!');
            for(var i in SOCKET_LIST){
            SOCKET_LIST[i].emit('addToChat', "Dealer has shuffled the cards!");
          	}
          
        });


 socket.on('distributeCards',function(data){
        
            console.log('players are getting cards!');
            distribute(cards,players);
            for(var i in SOCKET_LIST){
                console.log('sending players with cards');
                console.log(players);
                SOCKET_LIST[i].emit('getcards',players);
            }
          
        });

 socket.on('resetCards',function(data){
        
			console.log('cards are being reset');
            reset()
            for(var i in SOCKET_LIST){
            SOCKET_LIST[i].emit('addToChat', "Dealer has reset the cards!");
          	}
          	players = players.filter(function (el) {
  			return el != null;
			});
			players.forEach(pla => { pla.cards = [] ; pla.cardCount = 0;});
			console.log(players);
          	
          	for(var i in SOCKET_LIST){
            	console.log('resetting players card');
            	players.cards = [];
            	SOCKET_LIST[i].emit('getcards',players);
          }
          
        });

 socket.on('getFromDeck',function(data){
        console.log('sending one card to requested player');
        giveFromDeck(cards,players,data);
        for(var i in SOCKET_LIST){
                console.log('sending players with cards');
                console.log(players);
                SOCKET_LIST[i].emit('getcards',players,playedCards);
                SOCKET_LIST[i].emit('played',players,playedCards);
            }
    });

 socket.on('play',function(playerName,cardPlayed){
    console.log(playerName + ' Played ' + cardPlayed + 'card');
    play(players,playerName,cardPlayed);
    for(var i in SOCKET_LIST){
                console.log('playing the card');
                console.log(players);
                SOCKET_LIST[i].emit('played',players,playedCards);
            }

    });
 
});


 
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));