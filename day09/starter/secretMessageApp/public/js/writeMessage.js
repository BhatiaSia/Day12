function numeric(inputtxt){ 
    var letters = /^[a-zA-Z-,_!@#$%^&**():"<>?./';:]+$/;
    if(inputtxt.match(letters)){
        // alert('Your registration number have accepted : you can try another');
        // document.form1.text1.focus();
        return false;
    }
    else{
        // alert('Please input alphanumeric characters only');
        return true;
    }
}

function isUpper(txt){
    const text = txt.toLowerCase(); 
    if(text!==txt){
        // console.log(txt.toLowerCase());
        // console.log(txt);
        return true;
    }
    else{
        return false;
    }
}



const submitMessage = () =>{
    console.log('Submitting message...'); 
    const passcodeInput = document.querySelector("#passcode");
    const messageInput = document.querySelector("#message");
    const passcodeValue = passcodeInput.value;
    const messageValue = messageInput.value;

    const messageLength = messageValue.length;
    const messageLimit = 25;
    //console.log(numeric(passcodeValue));
    //console.log(isUpper(passcodeValue));
    
    if(messageLength<=messageLimit){
        if(numeric(passcodeValue)==true && isUpper(passcodeValue)==true){
            // Send to firebase
            firebase.database().ref().push({
            message: messageValue,
            passcode: passcodeValue
            
            });
        }
        else{
            alert("Make sure you have at least one capital letter and number!");
        }
    
       
        
    }
    else{
        alert(`Too many characters, please keep messages under ${messageLimit} characters!`);
    }

    passcodeInput.value = "";
    messageInput.value = "";

};

//const sendMessageButtton = document.querySelector('.button');
//sendMessageButtton.addEventListener('click', submitMessage); 
