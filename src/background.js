import "@babel/polyfill";
import urlUtils from "./utils/urlutil";
const urlUtilsController = new urlUtils();

chrome.history.onVisited.addListener(function (details) {
    const hostname = urlUtilsController.getHostname(details.url);
    console.log("hostname" , hostname);
    const promise = urlUtilsController.cleanUrl(hostname);
    promise.then((res) => {
        return res;
    })
    .then((status) => {
        urlUtilsController.removeUrlFromHistory(details.url);
    })
    .catch((e) => {
        console.log(e);
    });
});
chrome.browserAction.setBadgeText({text: 'CHALAK'});