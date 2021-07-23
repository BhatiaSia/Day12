const getMessages = () => {
    const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    findMessage(data);
    });
}

const findMessage = (messages) => {
    var passcodeAttempt = document.querySelector('#passcode').value;
    var hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(passcodeAttempt);
    var hash = hashObj.getHash("HEX");
    passcodeAttempt = hash;
    console.log(passcodeAttempt);
    for(message in messages) {
        const messageData = messages[message];
        if(messageData.passcode === passcodeAttempt) {
            renderMessageAsHtml(messageData.message)
        }
    }
}

const renderMessageAsHtml = (message) => {
    // Hide Input Form
    const passcodeInput = document.querySelector('#passcodeInput');
    passcodeInput.style.display = 'none';
    // Render messageas HTML
    const messageDiv = document.querySelector('#message');
    messageDiv.innerHTML = message;   
}