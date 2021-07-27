const signIn = (typeOfProvider) =>{
    let provider;
    if(typeOfProvider ==='Google'){
        provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithRedirect(provider)
        .then((result) =>{
            //do something with the result
            console.log(`Result is: ${result}`);
            const credential = result.credential; 
            const token = credential.accessToken;
            const user = result.user;

            console.log(user.uid);
            window.location = 'writeNote.html';
        }) 
        .catch(error=>{
            //somehing bad happened :(
            console.log(error);
        });
    }
    else if(typeOfProvider === 'Email'){
        provider = new firebase.auth.EmailAuthProvider();
        firebase.auth()
            .signInWithEmailAndPassword()
    }
    console.log("Calling sign-in");

    

};