async function initialiseAuth() {

    const consumerKey = "3MVG9I9urWjeUW04fPTlZQqxSf1uIm3rBgqN5giBfDZ8eKLgQnGWW0YTqn0SelH_PTdZc4aOqeI52fSA.sxdh";
    const redirectUri = 'https://of-sf-oauth-redirect';
    const oAuthOrigin = 'https://resilient-bear-y3oqr-dev-ed.lightning.force.com';//isSandbox ? 'https://test.salesforce.com' : 'https://login.salesforce.com';
    const initOAuthFlowUrl = `${oAuthOrigin}/services/oauth2/authorize?response_type=token&client_id=${consumerKey}&redirect_uri=${redirectUri}&prompt=select_account&scope=id+api`;

    let interval;
    const sfOAuthWin = await fin.Window.create({
        name: 'oauth-flow',
        url: initOAuthFlowUrl,
    });
    sfOAuthWin.addListener('closed', () => {
        window.clearInterval(interval);
    });

    // Check repeatedly until the oauth window location is the redirect uri, then grab the token
    accessToken = await new Promise((res, rej) => {
        interval = window.setInterval(async () => {
            const currentUrl = (await sfOAuthWin.getInfo()).url;
            if (currentUrl.startsWith(redirectUri)) {
                debugger;
                window.clearInterval(interval);
                const usp = new URLSearchParams(new URL(currentUrl).hash.substr(1));
                const token = usp.get('access_token');
                sfOAuthWin.close(true);
                if ((token ?? undefined) === undefined) {
                    rej({ error: 'Failed to retrieve access token' });
                } else {
                    res(token);
                }
            }
        }, 0.25e3);
    });

    return accessToken;
}
let accessToken;
function init() {
    const button = document.createElement("button");
    button.innerHTML = "Click me";

    const input = document.createElement("input");
    input.setAttribute("type", "text");

    button.onclick = async (evt) => {
        if (!accessToken) {
            accessToken = await initialiseAuth();
        }

        const manifest = await fin.System.launchManifest(`http://localhost:9999/salesforce.json?$$clientid=${input.value}&$$accessToken=${accessToken}`);
    };

    document.body.appendChild(button);
    document.body.appendChild(input);

}

window.addEventListener("DOMContentLoaded", evt => {
    init();
});