import dB from "./db";
const dbController = new dB();

export default class urlUtil {
    removeUrlFromHistory(url) {
        console.log(url);
        return new Promise((resolve, reject) => {
            try {
                if(url!==undefined) {
                    chrome.history.deleteUrl({url: url});
                    resolve('Ok');
                }
                else {
                    reject("Undefined url");
                }
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
    async checkIfIncognitoTabIsOpened(){
        let totalResolved = 0;
        return new Promise((resolve, reject) => {
            let totalResolved = 0;
            this.getAllTabs()
                .then(async (tabswithidurl)=>{
                    for (const tabwithidurl of tabswithidurl) {
                        try {
                            let p = await this.cleanUrl(urlUtil.getHostname(tabwithidurl.tabUrl));
                            if(p === "DELETE")
                                totalResolved++;
                        }
                        catch (e) {
                        }
                    }
                    resolve(totalResolved);
                })
                .catch(e=>{

                });
        });
    }
    deleteUrlInHistory(url) {
        return new Promise((resolve, reject) => {
            const promise = this.cleanUrl(urlUtil.getHostname(url));
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
        console.log(tab.url);
        return new Promise((resolve, reject) => {
            if(!tab.url)
                reject("no valid url");
            else {
                this.cleanUrl(urlUtil.getHostname(tab.url)).then((res) => {
                    chrome.tabs.remove(tab.id, ()=> {
                        resolve(tab.url);
                    });
                })
                .catch((e) => {
                    reject("tab's url is not in the blocked list");
                })
            }
        });
    }
    closeAllCurrentBlockedUrlTabs() {
        return new Promise((resolve, reject) => {
            chrome.tabs.query({}, (tabs) => {
                let urls_list =  tabs.map(async (tab) => {
                    try {
                        await this.closeBlockedUrlTab(tab);
                    }
                    catch (e) {}
                });
                Promise.resolve(1).then((res)=>{
                    const promises = tabs.map(async (tab)=>{
                        let result = {
                            domain: urlUtil.getHostname(tab.url),
                            url: tab.url,
                            dbDomain: null
                        };
                        let domain = urlUtil.getHostname(tab.url);
                        let dbData;
                        try{
                            dbData = await dbController.get(domain);
                            console.log("dbData",dbData);
                            let keys = Object.keys(dbData);
                            if(keys.length>0) {
                                result= {
                                    domain: domain,
                                    url: tab.url,
                                    dbDomain: keys[0]
                                };
                            }
                        }
                        catch (e) {
                        }
                        return result;
                    });
                    return Promise.all(promises);
                })
                .then((dom_url_db_data)=>{
                    return dom_url_db_data.map((obj)=>{
                        if( obj.dbDomain && obj.domain && obj.domain === obj.dbDomain)
                            return obj.url;
                    })
                })
                .then((resFinal)=>{
                    console.log("res_to_save",resFinal);
                    return dbController.set({restore_tabs_url_list: resFinal});
                })
                .then((resFinal)=>{
                    resolve(resFinal.restore_tabs_url_list);
                })
                .catch((e)=>{
                    reject(e);
                });
            })
            .catch((e)=>{
                reject(e);
            })
        });
    }

    restoreAllClosedwithCloseAllTabs() {
        return dbController.get("restore_tabs_url_list")
        .then((urls)=>{
             urls.restore_tabs_url_list.map(url=>{
                if(url)
                    chrome.tabs.create({'url': url,active: false}, (tab) => {});
            });
        })
        .then((res)=>{
            dbController.remove("restore_tabs_url_list");
        })
        .catch((e)=>{
            console.log(e);
        })
    }
    static getHostname(url) {
        if(url===undefined || url  === null) {
            return null;
        }
        else {
            var result = "";
            var l = document.createElement("a");
            l.href = url;
            var host = l.hostname.split(".");
            var len = host.length;
            return host[len-2];
        }
    };
    getCurrentOpenedTabHostName() {
        return new Promise((resolve, reject) => {
            try {
                chrome.tabs.query({active: true, currentWindow: true }, (tabs)=>{
                    if(tabs[0].url === undefined || tabs[0].url === null)
                        reject("Null or Undefined url");
                    else
                        resolve(urlUtil.getHostname(tabs[0].url));
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /*
   * set badge on action icon
   * */
    setBadgeOnActionIcon(badge) {
        chrome.browserAction.setBadgeText({text: badge});
    }
    /*
    * get all tabs with valid urls
    * */
    getAllTabs(params={}) {
        return new Promise((resolve, reject)=>{
            let tabWithValidUrl = [];
            chrome.tabs.query(params, (tabs)=> {
                tabWithValidUrl = tabs.filter((tab)=> {
                    if(tab.url !== undefined && tab.url !== null ) {
                        return {
                            tabUrl: tab.url ,
                            tabId: tab.tabId
                        };
                    }
                });
                resolve(tabWithValidUrl);
            });
        });
    }
};