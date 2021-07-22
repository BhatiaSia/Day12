const submitMessage = () =>{
    console.log('Submitting message...'); 
    const passcodeInput = document.querySelector("#passcode");
    const messageInput = document.querySelector("#message");
    const passcodeValue = passcodeInput.value;
    const messageValue = messageInput.value;
    
    // Send to firebase
    firebase.database().ref().push({
        message: messageValue,
        passcode: passcodeValue

    }); 

    passcodeInput.value = "";
    messageInput.value = "";

};

//const sendMessageButtton = document.querySelector('.button');
//sendMessageButtton.addEventListener('click', submitMessage); 
