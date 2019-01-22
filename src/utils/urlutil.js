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
    cleanUrl(domain) {
        return new Promise((resolve, reject) => {
            const dbPromise = dbController.get(domain);
            dbPromise.then((db_res)=>{
                let key = Object.keys(db_res);
                if(key.length>0)
                    resolve("DELETE");
                else
                    reject("DONOTDELETE");
            });
        });
    };
    deleteUrlInHistory(url) {
        return new Promise((resolve, reject) => {
            const promise = this.cleanUrl(this.getHostname(url));
            promise.then((res) => {
                return res;
            })
            .then((status) => {
                return this.removeUrlFromHistory(url);
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
        const that = this;
        console.log(tab.url);
        return new Promise((resolve, reject) => {
            that.cleanUrl(that.getHostname(tab.url)).then((res) => {
                chrome.tabs.remove(tab.id, ()=> {
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
           return  tabs.map((tab) => {
                 this.closeBlockedUrlTab(tab);
            })
        });
    }
    getHostname(url) {
        var result = "";
        var l = document.createElement("a");
        l.href = url;
        var host = l.hostname.split(".");
        var len = host.length;
        return host[len-2];
    };
    getCurrentOpenedTabHostName() {
        return new Promise((resolve, reject) => {
            try {
                chrome.tabs.query({active: true, currentWindow: true }, (tabs)=>{
                    resolve(this.getHostname(tabs[0].url));
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
};