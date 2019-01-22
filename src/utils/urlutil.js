import * as JsonData from "../data/websites";
import dB from "./db";

const dbController = new dB();

export default class urlUtil {
    removeUrlFromHistory(url) {
        console.log(url);
        return new Promise((resolve, reject) => {
            try {
                chrome.history.deleteUrl({url: url});
                resolve('Ok');
            }
            catch (e) {
                reject(e);
            }
        });
    }
    cleanUrl(url) {
        return new Promise((resolve, reject) => {
            const dbPromise = dbController.get(this.getHostname(url));
            dbPromise.then((db_res)=>{
                if(db_res)
                    resolve("DELETE");
                else
                    reject("DONOTDELETE");
            });
        });
    };
    deleteUrlInHistory(url) {
        const that = this;
        const removeUrlFromHistory = this.removeUrlFromHistory;
        return new Promise((resolve, reject) => {
            const hostname = that.getHostname(url);
            const promise = that.cleanUrl(hostname);
            promise.then((res) => {
                return res;
            })
            .then((status) => {
                return removeUrlFromHistory(url);
            })
            .then((re) => {
                resolve(re);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }
    closeBlockedUrlTab(tab) {
        const cleanUrl = this.cleanUrl;
        return new Promise((resolve, reject) => {
            var promise = cleanUrl(tab.url);
            promise.then((res) => {
                chrome.tabs.remove(tab.id, function() {
                    resolve("done");
                });
            })
            .catch((e) => {
                console.log("tab's url is not in the blocked list");
                reject("tab's url is not in the blocked list");
            })
        });
    }
    closeAllCurrentBlockedUrlTabs() {
        const closeBlockedUrlTab= this.closeBlockedUrlTab;
        chrome.tabs.query({}, (tabs) => {
            tabs.map((tab) => {
                return closeBlockedUrlTab(tab);
            })
        });
    }
    getHostname(url) {
        console.log("gethostname" , url);
        var result = "";
        var l = document.createElement("a");
        l.href = url;
        var host = l.hostname.split(".");
        var len = host.length;
        return host[len-2];
    };
    getCurrentOpenedTabHostName() {
        const that = this;
        return new Promise((resolve, reject) => {
            try {
                chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
                    resolve(that.getHostname(tabs[0].url));
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
};