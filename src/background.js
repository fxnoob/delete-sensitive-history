import "@babel/polyfill";
import urlUtils from "./utils/urlutil";
import * as JsonData from './data/websites';
import dB from "./utils/db";

const urlUtilsController = new urlUtils();
const dbController = new dB();

dbController.get("isFirstTimeLoad").then((res) => {
    if(res === undefined) {
        dbController.set(JsonData.blocked_sites).then(() => {
            dbController.set({"isFirstTimeLoad":true});
        });
    }
})
.catch((e)=>{

});

chrome.history.onVisited.addListener(function (details) {
   // urlUtilsController.closeAllCurrentBlockedUrlTabs();
    const promise = urlUtilsController.deleteUrlInHistory(details.url);
    promise.then((res) => {
        console.log("success" , res);
    })
    .catch((e) => {
        console.log(e);
    });
});
chrome.browserAction.setBadgeText({text: 'CHALAK'});