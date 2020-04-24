	var socket = io();
	var chatText = document.getElementById('chat-text');
    var chatInput = document.getElementById('chat-input');
    var playerName = document.getElementById('playerName');
    var chatForm = document.getElementById('chat-form');
    var playerForm = document.getElementById('playerForm');
    var chatContainer = document.getElementById('chatContainer');
    var playerlist = document.getElementById('playersBox');
    var btnAddme = document.getElementById('btnAddMe');
	var playerArea=document.getElementById('divPlayerArea');
	var unoAudio = document.getElementById('unoAudio');
	var checkAudio = document.getElementById('checkAudio');
	var shuffleAudio = document.getElementById('shuffleAudio');
	var dealAudio = document.getElementById('dealAudio');
	var winnerAudio = document.getElementById('winnerAudio');
    var player ;
    var players  = {} ;
    var playerTurn = false;


    

   chatContainer.style.visibility = "hidden" ;
	 playerArea.style.visibility="hidden";

   socket.on('getcards',function(data,playedCards){
   	document.onmousedown = startDrag;
        document.onmouseup = stopDrag;

	data = data.filter(function (el) {
  			return el != null;
			});
   		players = data;
   		
   		try {
				dealAudio.play();
			}
			catch(error) {
				console.error(error);
			}

   		if(players.length==0)
   		{
   			document.getElementById('playerCard').innerHTML= "";
   		}
   		displayPlayers(players,[]);
   		for(var i in players){
   			if (players[i].name == playerName.value)
   			{
   				playerTurn = players[i].playerTurn ;
   				player = players[i];
   				if (player.cards!= null && player.cards.length >0) {
				for (var j in  player.cards)
				{
					var tempId = player.cards[j];
					var elem = document.createElement("img");
					elem.setAttribute("src", "./images/"+  player.cards[j]);
					elem.setAttribute("id",tempId);
					elem.setAttribute("class", "playerCardImage");
					//elem.setAttribute("ondblclick", "playerplayed(" +'"'+ player.cards[j]+'"'+")");
					elem.addEventListener("dblclick", (e) => { playerplayed(e); }, false);

					if(document.getElementById(tempId) == null)
					{
						document.getElementById('playerCard').appendChild(elem);
					}
				}
				}
				else
				{
					document.getElementById('playerCard').innerHTML= "";
				}
   			}

           }

           if(playedCards==null || playedCards.length==0)
           {
           		document.getElementById('playedCard').innerHTML= "";
		   }

   	});

   	socket.on('restartingGame',function(){
   		location.reload();
   	});

	function playerplayed(e)
	{
		e.preventDefault();
		document.getElementById('drawValue').innerHTML = '';
		
		if(playerTurn)
		{
			//logic of skip, reverse, play more than one cards has to be figured before implemting player turn
		}
		socket.emit('play', playerName.value,e.target.id);
	}


	socket.on('played',function(players,playedCards,lastPlayerName, lastCardPlayed, winners){
		players = players.filter(function (el) {
  			return el != null;
			});
		document.getElementById('playedCard').innerHTML= "";
		document.getElementById('playerCard').innerHTML= "";
		displayPlayers(players, winners);
		//again set player card here
		for(var i in players){
   			if (players[i].name == playerName.value)
   			{
   				playerTurn = players[i].playerTurn ;
   				player = players[i];
   				if (player.cards!= null && player.cards.length >0) {
   				for (var j in  player.cards)
					{
						var tempId = player.cards[j].replace(".jpg","");
						var elem = document.createElement("img");
						elem.setAttribute("src", "./images/"+  player.cards[j]);
						elem.setAttribute("id",tempId);
						elem.setAttribute("class", "playerCardImage");
						//elem.setAttribute("ondblclick", "playerplayed(" +'"'+ player.cards[j]+'"'+")");
						elem.addEventListener("dblclick", (e) => { playerplayed(e,player.cards[j]); }, false);
						
						if(document.getElementById(tempId) == null)
						{
							document.getElementById('playerCard').appendChild(elem);
						}
					}
				}
				else
				{
					document.getElementById('playerCard').innerHTML= "";
				}
   			}

           }

           //set played card area
           if (playedCards!= null && playedCards.length >0) {
   				for (var j in  playedCards)
					{
						var tempId = playedCards[j];
						var elem = document.createElement("img");
						elem.setAttribute("src", "./images/"+  playedCards[j]);
						elem.setAttribute("id",tempId);
						elem.setAttribute("class", "playedCardImage");
						//elem.setAttribute("onclick", "playerplayed(" +'"'+ playedCards[j]+'"'+")");
						//var pElem = document.createElement("p");
						//var node = document.createTextNode("he played");
						//pElem.appendChild(node);

						if(playedCards[j] == lastCardPlayed)
						{
							var pElem = document.createElement("p");
							var node = document.createTextNode(lastPlayerName);
							pElem.appendChild(node);
							pElem.setAttribute("class","lastPlayed");
							pElem.style.right = '9%';
							pElem.style.top = '40%';
						}
						
						if(document.getElementById(tempId) == null)
						{
							document.getElementById('playedCard').appendChild(elem);

							if(pElem!=null)
							{
								document.getElementById('playedCard').appendChild(pElem);	
							}
							
							
						}
					}
				}

				if(lastCardPlayed.includes('noCard'))
				{
					document.getElementById('drawValue').innerHTML = lastPlayerName + ' drew';
				}
				else
				{
					document.getElementById('drawValue').innerHTML = '';	
				}

	});



//add a chat cell to our chat list view, and scroll to the bottom
    socket.on('addToChat',function(data){

        //console.log('got a chat message');
        if(data.includes("Uno"))
        {

			try {
				unoAudio.play();
			}
			catch(error) {
				console.error(error);
			}
        	
        }

        if(data.includes("Check"))
        {
        	try {
				checkAudio.play();
			}
			catch(error) {
				console.error(error);
			}
        	
        }


        if(data.includes("has won"))
        {
        	try {
				winnerAudio.play();
			}
			catch(error) {
				console.error(error);
			}
        	
        }


        if(data.includes("has shuffled the cards"))
        {
        	try {
				shuffleAudio.play();
			}
			catch(error) {
				console.error(error);
			}
        	
        }

        
        chatText.innerHTML += '<div class="chatCell">' + data + '</div>';
        chatText.scrollTop = chatText.scrollHeight;

    });
		chatForm.onsubmit = function(e){
        //prevent the form from refreshing the page
        e.preventDefault();

        //call sendMsgToServer socket function, with form text value as argument
        socket.emit('sendMsgToServer', playerName.value +' : ' +chatInput.value);
        chatInput.value = "";
	}

	socket.on('addToPlayer',function(data,index){

        players = data;
        player = data[index];
        if(player!=null)
        {
        	btnAddme.style.visibility = "hidden";
					welcomeUno.style.visibility="hidden";
					playerForm.style.visibility="hidden";
					divWelcomePlayer.style.visibility="visible";
					divWelcomePlayer.innerHTML = playerName.value+" let's play Uno!";
        	playerName.readOnly = true;
        	chatContainer.style.visibility = "visible" ;
					playerArea.style.visibility="visible";
        	var filtered = players.filter(function (el) {
  			return el != null;
			});
			displayPlayers(filtered,[]);
        }

    });

	playerForm.onsubmit = function(e){
		e.preventDefault();
		if(playerName.value!=null && playerName.value!='')
		{
			socket.emit('playerRegister',playerName.value);
		}
		else {
			alert('Please enter your name');
				}
	}


	function displayPlayers(item, winners) {
		//console.log("display players");
		//console.log(item);
		playerlist.innerHTML = "";
		var start = true;
		var winner ;
		var someoneWon = false;
		for(var index in item)
		{
			if(item[index].cardCount != 0)
			{
				//if any player has at least 1 card then this is not start.
				start = false;
			}
		}
		for(var index in item){
			    if(item[index].cardCount == 0 && start!=true)
				{
					someoneWon = true;
					if(!winners.includes(item[index].name))
					{
						winner = item[index].name ; 
					}
					
				}
				playerlist.innerHTML += item[index].id + ". " + item[index].name + "- " + item[index].cardCount +"<br>";
            }

            if(someoneWon==true)
            {
            	if(winner!=null)
            	{
            		socket.emit('win', winner);	
            	}
            	
            }
            
	}



	function getFromDeck()
	{
		if(playerTurn)
		{
			//logic of skip, reverse, play more than one cards has to be figured before implemting player turn
		}
		try {
				dealAudio.play();
			}
			catch(error) {
				console.error(error);
			}
		socket.emit('getFromDeck', playerName.value);

	}




	const buttonUno = document.getElementById('btnUno');
	buttonUno.addEventListener('click', function(e) {
	  	e.preventDefault();
	  	try {
				unoAudio.play();
			}
			catch(error) {
				console.error(error);
			}

		socket.emit('sendMsgToServer', playerName.value +' : said Uno');
	});

	const buttonCheck = document.getElementById('btnCheck');
	buttonCheck.addEventListener('click', function(e) {
	  	e.preventDefault();
	  	try {
				checkAudio.play();
			}
			catch(error) {
				console.error(error);
			}
		socket.emit('sendMsgToServer', playerName.value +' : said Check');
	});

	function startDrag(e) {
        // determine event object
        if (!e) {
          var e = window.event;
        }

        // IE uses srcElement, others use target
        var targ = e.target ? e.target : e.srcElement;

        if (targ.className != 'playerCardImage') {return};
        // calculate event X, Y coordinates
          offsetX = e.clientX;
          offsetY = e.clientY;

        // assign default values for top and left properties
        if(!targ.style.left) { targ.style.left='0px'};
        if (!targ.style.top) { targ.style.top='0px'};

        // calculate integer values for top and left 
        // properties
        coordX = parseInt(targ.style.left);
        coordY = parseInt(targ.style.top);
        drag = true;

        // move div element
          document.onmousemove=dragDiv;
        
      }

      function stopDrag() {
        drag=false;
      }

      function dragDiv(e) {
        if (!drag) {return};
        if (!e) { var e= window.event};
        var targ=e.target?e.target:e.srcElement;
        // move div element
        targ.style.left=coordX+e.clientX-offsetX+'px';
        targ.style.top=coordY+e.clientY-offsetY+'px';
        return false;
      }
