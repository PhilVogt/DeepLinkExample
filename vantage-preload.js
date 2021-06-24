
function initVantage() {
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

const initSalesForce = () => {

    fin.desktop.main(userAppConfigArgs => {
        alert(JSON.stringify(userAppConfigArgs));
    });
    let app = fin.Application.getCurrentSync();
    // If app is already running parameters are passed through the “run-requested” event
    app.addListener("run-requested", function (event) {
        if (event.userAppConfigArgs) {
            alert(`Update ${JSON.stringify(event.userAppConfigArgs)}`);
        }
    });
};

window.addEventListener("DOMContentLoaded", evt => {
    if (fin.me.identity.name === "VantageView") {
        initVantage();
    } else if (fin.me.identity.name === "SalesForceView") {
        initSalesForce();
    }
});