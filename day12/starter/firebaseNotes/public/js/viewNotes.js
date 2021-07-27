//when page loads, check user logged in state

const showNotes = () =>{
    document.querySelector("#app").innerHTML = "";
    firebase.auth().onAuthStateChanged(user => {
            if(user){
                const googleUserId = user.uid;
                const tag = document.querySelector("#searchBox").value.toLowerCase().trim();
                
                getNotes(googleUserId,tag);
            }
            else {
                window.location = 'index.html';
            }
        });

//If not logged in, redirect to login page
//If logged in, get user's nottes from tthe database (db)
//      Display notes on page 
}
//Get notes from db, display them on the page 
const getNotes = (userId, tag)=>{
    console.log(userId);
    const userRef = firebase.database().ref(`users/${userId}/${tag}`);
    userRef.on('value', snapshot =>{
        writeNotesToHtml(snapshot.val());
    });
    
};

const writeNotesToHtml = (data) =>{
    const noteRenderArea = document.querySelector('#app');
    for(let noteKey in data){
        //create html string for one note
        let noteHtml = createHtmlForNote(data[noteKey]);
        noteRenderArea.innerHTML += noteHtml;
    }
    //put all html into page at once 

};

//returns a string of HTTML for one note
const createHtmlForNote = (note)=>{
    //TODO: create the elements and put in the enote data 
    const colour = generateRandom();
    return `<div class = "column is-one-third">
                <div class="card" style=`+`background:${colour}`+`>
                    <header class="card-header">
                        <p class="card-header-title">
                            ${note.title}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            ${note.text}
                        </div>
                    </div>
                    ${makeTag(note.tag)}
                </div>
            </div>`;
};

function generateRandom(){
    const r = Math.floor(Math.random() * (255));
    const g = Math.floor(Math.random() * (255));
    const b = Math.floor(Math.random() * (255));
    const hexCode = `rgb(${r},${g},${b})`;
    //document.querySelector(".card").setAttribute("style", `background: ${hexCode};`);
    return hexCode;
}

function makeTag(tagString){
    const tagList = tagString.toLowerCase().split(",");
    let htmlString = '';
    console.log(tagList.length);
    for(let i=0; i<tagList.length; i++){
        htmlString += `<span class="tag is-dark">${tagList[i].trim()}</span>`
        console.log(`added: ${tagList[i]}`);
    }
    return htmlString;
    
}