
function init() {
    const button = document.createElement("button");
    button.innerHTML = "Click me";

    const input = document.createElement("input");
    input.setAttribute("type", "text");

    button.onclick = async (evt) => {
        const manifest = await fin.System.launchManifest(`http://localhost:9999/salesforce.json?$$clientid=${input.value}`);
    };

    document.body.appendChild(button);
    document.body.appendChild(input);
}

window.addEventListener("DOMContentLoaded", evt => {
    init();
});