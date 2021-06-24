

const initOpenFinParamListener = () => {
    let currentClientId;
    fin.desktop.main(userAppConfigArgs => {
        if (currentClientId !== userAppConfigArgs.clientid) {
            currentClientId = userAppConfigArgs.clientid;
        }
    });
    let app = fin.Application.getCurrentSync();
    // If app is already running parameters are passed through the “run-requested” event
    app.addListener("run-requested", function (event) {
        if (event.userAppConfigArgs) {
            if (currentClientId !== event.userAppConfigArgs.clientid) {
                currentClientId = event.userAppConfigArgs.clientid;
                alert(`Update ${currentClientId}`);
            }
        }
    });
};

window.addEventListener("DOMContentLoaded", event => {
    initOpenFinParamListener();
});