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
    
    console.log(ver.innerHTML);
    
}
getVersion();