		chatForm.onsubmit = function(e){
        //prevent the form from refreshing the page
        e.preventDefault();
       
        //call sendMsgToServer socket function, with form text value as argument
        socket.emit('sendMsgToServer', chatInput.value);
        chatInput.value = "";

        
    }