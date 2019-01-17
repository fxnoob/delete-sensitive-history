import "@babel/polyfill";
import urlUtils from "./utils/urlutil";
const urlUtilsController = new urlUtils();

chrome.history.onVisited.addListener(function (details) {
    urlUtilsController.closeAllCurrentBlockedUrlTabs();
    const promise = urlUtilsController.deleteUrlInHistory(details.url);
    promise.then((res) => {
        console.log("success" , res);
    })
    .catch((e) => {
        console.log(e);
    });
});
chrome.browserAction.setBadgeText({text: 'CHALAK'});