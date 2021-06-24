const initOpenFinParamListener = () => {

    fin.desktop.main(userAppConfigArgs => {
        debugger;
        alert(JSON.stringify(userAppConfigArgs));
    });
    let app = fin.Application.getCurrentSync();
    // If app is already running parameters are passed through the “run-requested” event
    app.addListener("run-requested", function (event) {
        if (event.userAppConfigArgs) {
            alert(event.userAppConfigArgs);
        }
    });
};

window.addEventListener("DOMContentLoaded", event => {
    initOpenFinParamListener();
});