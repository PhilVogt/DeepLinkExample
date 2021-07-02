

function initOpenFinParamListener() {
    let currentClientId;
    fin.desktop.main(userAppConfigArgs => {
        debugger;
        if (currentClientId !== userAppConfigArgs.clientid) {
            currentClientId = userAppConfigArgs.clientid;
            accessToken = userAppConfigArgs.accessToken;
        }
    });
    let app = fin.Application.getCurrentSync();
    // If app is already running parameters are passed through the “run-requested” event
    app.addListener("run-requested", async function (event) {
        debugger;

        if (event.userAppConfigArgs) {
            if (currentClientId !== event.userAppConfigArgs.clientid) {
                currentClientId = event.userAppConfigArgs.clientid;
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentClientId}`, {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer ' + event.userAppConfigArgs.accessToken
                    })
                });
                const json = await response.json();
                alert(json.name);
            }
        }
    });
};

window.addEventListener("DOMContentLoaded", event => {
    initOpenFinParamListener();
});