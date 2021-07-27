let googleUser, userId;

window.onload = () => {
    firebase.auth()
        .onAuthStateChanged(user => {
            if (user) {
                console.log(`Logged in as: ${user.displayName}`);
                googleUser = user;
                userId = googleUser.uid;
            }
            else {
                window.location = 'index.html';
            }
        });

}
const submitNote = () => {
    const note = document.querySelector('#noteText').value;
    const title = document.querySelector('#noteTitle').value;
    const tag = document.querySelector('#noteTag').value;

    firebase.database().ref(`users/${userId}/${tag}`).push({
        title: title,
        note: note,
        timestamp: new Date().toString()
    })
        .then(() => {
            alert("Your note has been added!");
            document.querySelector('#noteText').value = "";
            document.querySelector('#noteTitle').value = "";
            document.querySelector('#noteTag').value = "";

        }) 
        .catch((error)=>{
            alert("Your note has not been added, try again");
        });



};