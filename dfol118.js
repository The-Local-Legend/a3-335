let username, password = "";
let loggedin = false;



const getVersion = () => {
    const fetchprom = fetch("https://cws.auckland.ac.nz/gas/api/Version",
    {
        headers:{
            "Accept": "application/json"
        },
    }
    );
    const streamPromise = fetchprom.then((response) => response.json());
    let ver = document.getElementById("Version");
    streamPromise.then((resp) => ver.innerHTML = resp);
    
    
    
}
getVersion();
const submitrego  = async () =>{
    let usern = document.getElementById("username").value;
    let passw = document.getElementById("password").value;
    let addr = document.getElementById("address").value;
    const data = JSON.stringify({username: usern, password: passw, address: addr});
    console.log(data);
    const fetchprom = await fetch("https://cws.auckland.ac.nz/gas/api/Register", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: data,
    });
    let loginresponse = await fetchprom.text();
    document.getElementById("regresult").innerHTML = loginresponse;
}

const dologin = async (usernameattempt, passwordattempt) =>{
    
    const fetchprom = await fetch("https://cws.auckland.ac.nz/gas/api/VersionA",{
        method: "GET",
        headers: {
            "Authorization": `Basic ${btoa(`${usernameattempt}:${passwordattempt}`)}`
        }
    });
    if(fetchprom.status == 200){
        console.log("yay");
        username = usernameattempt;
        password = passwordattempt;
        document.getElementById("loginbtn").style.display = "none";
        document.getElementById("currentuser").innerHTML = "Logged in as " + username;
        document.getElementById("loginstatus").innerHTML = "Login successful";
        document.getElementById("logout").style.display = "inline";
        loggedin = true;
    }
    else{
        document.getElementById("loginstatus").innerHTML = "Login details invalid";
        console.log(fetchprom.text());
    }
}
const getAllItems = async() => {
    const fetchprom =   fetch(`https://cws.auckland.ac.nz/gas/api/AllItems`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    const jsonprom = fetchprom.then((items) => items.json());
    const data = await jsonprom.then((items) => {return items});
    let htmlString = "";
    
    data.forEach(async(item) => {
        
            htmlString += `<tr><td><img src="https://cws.auckland.ac.nz/gas/api/ItemPhoto/${item.id}" width="25%" alt="${item.name}">
            
                <h4 id="itemName">${item.name}</h4> 
                <p>${item.description}</p> 
                <br>
                <p>$${item.price}</p>
                <br>
                <button type="button" onclick=buyItem(${item.id})>Buy Now</button>
               
            </td></tr>`
        
        
        
    });
    document.getElementById("goodstable").innerHTML = htmlString;
}
const getItems = async(search = "") => {
    const fetchprom =   fetch(`https://cws.auckland.ac.nz/gas/api/Items/${search}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    const jsonprom = fetchprom.then((items) => items.json());
    const data = await jsonprom.then((items) => {return items});
    let htmlString = "";
    
    data.forEach(async(item) => {
        
            htmlString += `<tr><td><img src="https://cws.auckland.ac.nz/gas/api/ItemPhoto/${item.id}" width="25%" alt="${item.name}">
            
                <h4 id="itemName">${item.name}</h4> 
                <p>${item.description}</p> 
                <br>
                <p>$${item.price}</p>
                <br>
                <button type="button" onclick=buyItem(${item.id})>Buy Now</button>
                <div id="purchaseMessage${item.id}" class="modal"> <div id="innermessage${item.id}" class="innercontent"></div></div>
            </td></tr>`
        
        
        
    });
    document.getElementById("goodstable").innerHTML = htmlString;
}
const buyItem = (id) => {
    if(loggedin){
        fetch(`https://cws.auckland.ac.nz/gas/api/PurchaseItem/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${btoa(`${username}:${password}`)}`
            }
        });
        const message = document.getElementById(`innermessage${id}`);
        console.log(id);
        console.log(message);
        const messagemodal = document.getElementById(`purchaseMessage${id}`);
        message.innerHTML = `Thank you for purchasing our product. <span class="close" onclick=closemessage("purchaseMessage${id}")>&times;</span>`;
        messagemodal.style.display = "block";
    }
    else{
        login();
    }
}
const getComments = async() => {
    const fetchprom = fetch("https://cws.auckland.ac.nz/gas/api/Comments");
    const fetchresult = fetchprom.then((comments) => comments.text());
    await fetchresult.then((comments) => document.getElementById("recentcomments").innerHTML = comments);
}
const postComment = async() => {
    let commentsend;
    if(username == ""){
        commentsend = JSON.stringify({Comment: document.getElementById("comment").value, Name: "Guest"});
    }
    else{
        commentsend = JSON.stringify({Comment: document.getElementById("comment").value, Name: username});
    }
    console.log(commentsend)
    
    const resp = await fetch("https://cws.auckland.ac.nz/gas/api/Comment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:commentsend,
    });
    console.log(resp);
    getComments();
    document.getElementById("comment").value = "";
}
function closemessage(div){
    document.getElementById(div).style.display = "none";
}
function logout(){
    username = "";
    password = "";
    document.getElementById("loginbtn").style.display = "inline";
    document.getElementById("currentuser").innerHTML = "";
    document.getElementById("logout").style.display = "none";
    document.getElementById("loginstatus").innerHTML = "";
    loggedin = false;
}
function move(){
    document.getElementById("home").style.display = "none";
    document.getElementById("shop").style.display = "none";
    document.getElementById("rego").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("play").style.display = "none";
    document.getElementById("guest").style.display = "none";
    document.getElementById("homebtn").style.backgroundColor = "rgb(172, 123, 68)";
    document.getElementById("shopbtn").style.backgroundColor = "rgb(172, 123, 68)";
    document.getElementById("regobtn").style.backgroundColor = "rgb(172, 123, 68)";
    document.getElementById("loginbtn").style.backgroundColor = "rgb(172, 123, 68)";
    document.getElementById("playbtn").style.backgroundColor = "rgb(172, 123, 68)";
    document.getElementById("guestbtn").style.backgroundColor = "rgb(172, 123, 68)";
}
function home(){
    move();
    document.getElementById("home").style.display = "block";
    document.getElementById("homebtn").style.backgroundColor = "rgb(216, 161, 97)";
}
function shop(){
    move();
    document.getElementById("shop").style.display = "block";
    document.getElementById("shopbtn").style.backgroundColor = "rgb(216, 161, 97)";
    getAllItems();
}
function rego(){
    move();
    document.getElementById("rego").style.display = "block";
    document.getElementById("regobtn").style.backgroundColor = "rgb(216, 161, 97)";
}
function login(){
    move();
    document.getElementById("login").style.display = "block";
    document.getElementById("loginbtn").style.backgroundColor = "rgb(216, 161, 97)";
}
function play(){
    move();
    document.getElementById("play").style.display = "block";
    document.getElementById("playbtn").style.backgroundColor = "rgb(216, 161, 97)";
}
function guest(){
    move();
    document.getElementById("guest").style.display = "block";
    document.getElementById("guestbtn").style.backgroundColor = "rgb(216, 161, 97)";
    getComments();
}
home();