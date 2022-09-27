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
}
home();