	var socket = io();
	var chatText = document.getElementById('chat-text');
    var chatInput = document.getElementById('chat-input');
    var chatForm = document.getElementById('chat-form');

//add a chat cell to our chat list view, and scroll to the bottom
    socket.on('addToChat',function(data){
              
        console.log('got a chat message');
        chatText.innerHTML += '<div class="chatCell">' + data + '</div>';
        chatText.scrollTop = chatText.scrollHeight;
              
    });
		chatForm.onsubmit = function(e){
        //prevent the form from refreshing the page
        e.preventDefault();
       
        //call sendMsgToServer socket function, with form text value as argument
        socket.emit('sendMsgToServer', chatInput.value);
        chatInput.value = "";
		}

    socket.on('addToChat',function(data){
              
        console.log('got a chat message');
        chatText.innerHTML += '<div class="chatCell">' + data + '</div>';
        chatText.scrollTop = chatText.scrollHeight;
              
    });

    const buttonshuffle = document.getElementById('btnShuffle');
	buttonshuffle.addEventListener('click', function(e) {
	  
		e.preventDefault();
       	socket.emit('shuffleCards', "shuffleRequest");
    });

	const buttondistribute = document.getElementById('btnDistribute');
	buttondistribute.addEventListener('click', function(e) {
	  e.preventDefault();
       	socket.emit('distributeCards', "distribute Request");
	});

	const buttonReset = document.getElementById('btnReset');
	buttonReset.addEventListener('click', function(e) {
	  e.preventDefault();
       	socket.emit('resetCards', "Reset Request");
	});


    const buttonflip = document.getElementById('btnflipOne');
    buttonflip.addEventListener('click', function(e) {
      e.preventDefault();
        socket.emit('getFromDeck', 'Dealer');
    });

    const btnRestartGame = document.getElementById('btnRestartGame');
    btnRestartGame.addEventListener('click', function(e) {
      e.preventDefault();
        socket.emit('restartGame');
    });

	socket.on('getcards',function(data,index){
        console.log('players are getting cards');
        console.log(data);
              
    });
