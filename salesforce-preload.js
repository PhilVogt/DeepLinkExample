const initOpenFinParamListener = () => {

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

window.addEventListener("DOMContentLoaded", event => {
    initOpenFinParamListener();
});