import "@babel/polyfill";
import urlUtils from "./utils/urlutil";
import * as JsonData from './data/websites';
import dB from "./utils/db";

const urlUtilsController = new urlUtils();
const dbController = new dB();
let ActiveTabDetails = {
    tabId : null
};

dbController.get("isFirstTimeLoad").then((res) => {
    if(res === undefined) {
        dbController.set(JsonData.blocked_sites).then(() => {
            dbController.set({"isFirstTimeLoad":true});
        });
    }
})
.catch((e)=>{
});

//when new url is updated in the history
chrome.history.onVisited.addListener(function (details) {
    console.log("chrome.history.onVisited",details.url);
    const promise = urlUtilsController.deleteUrlInHistory(details.url);
    console.log(details.url);
    promise.then((res) => {
        console.log("success" , res);
    })
    .catch((e) => {
        console.log(e);
    });
});
//when active tab is changed
chrome.tabs.onActivated.addListener((activeTabDetail)=>{
    ActiveTabDetails.tabId =  activeTabDetail.tabId;
    chrome.tabs.get(activeTabDetail.tabId , (tab) => {
        console.log("chrome.tabs.onActivated.",tab.url);
        if(tab.url!==undefined) {
            dbController.get(urlUtils.getHostname(tab.url!==undefined?tab.url:'')).then((res)=>{
                const key = Object.keys(res);
                if(key.length>0)
                    chrome.browserAction.setBadgeText({text: '♥'});
                else
                    chrome.browserAction.setBadgeText({text: ''});
            }).catch((e)=>{
                console.log("else ",e);
                chrome.browserAction.setBadgeText({text: ''});
            })
        }
        else {
            chrome.browserAction.setBadgeText({text: ''});
        }
    });
});
//when active tab is updated eg navigating to new url in active tab
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(tabId!== undefined && tabId === ActiveTabDetails.tabId) {
        chrome.tabs.get(tabId , (tab) => {
            if(tab.url!==undefined) {
                dbController.get(urlUtils.getHostname(tab.url!==undefined?tab.url:''))
                    .then((res)=>{
                        const key = Object.keys(res);
                        if(key.length>0)
                            chrome.browserAction.setBadgeText({text: '♥'});
                        else
                            chrome.browserAction.setBadgeText({text: ''});
                    })
                    .catch((e)=>{
                        console.log("else ",e);
                        chrome.browserAction.setBadgeText({text: ''});
                    })
            }
        });
    }
    else {
        chrome.browserAction.setBadgeText({text: ''});
    }
});