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
                    resolve(tab.url);
                });
            })
            .catch((e) => {
                console.log("tab's url is not in the blocked list");
                reject("tab's url is not in the blocked list");
            })
        });
    }
    closeAllCurrentBlockedUrlTabs() {
        chrome.tabs.query({}, (tabs) => {
            let urls_list =  tabs.map(async (tab) => {
                 return this.closeBlockedUrlTab(tab);
            });
            dbController.set({restore_tabs_url_list: urls_list});
        });
    }
    restoreAllClosedwithCloseAllTabs() {
        dbController.get("restore_tabs_url_list")
        .then((urls)=>{
            urls.map(url=>{
                chrome.tabs.create({'url': url}, (tab) => {});
            });
        })
        .catch((e)=>{
            console.log(e);
        })
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