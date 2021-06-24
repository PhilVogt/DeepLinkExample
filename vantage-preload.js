alert("asdasdasdasdasdasd");
function init() {
    debugger;
    const button = document.createElement("button");
    button.innerHTML = "Click me";
    button.onclick = async (evt) => {
        const manifest = await fin.System.launchManifest('http://localhost:9999/salesforce.json?$$clientid=8787262');
    };

    document.body.appendChild(button);
}

window.addEventListener("DOMContentLoaded", evt => {
    alert("shitit");
    init();
});