import * as JsonData from "../data/websites";

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
            var blocked_websites = JsonData.blocked_sites;
            if(url in blocked_websites)
                resolve("DELETE");
            else
                reject("DONOTDELETE");
        });
    };
    getHostname(url) {
        console.log("gethostname" , url);
        var result = "";
        var l = document.createElement("a");
        l.href = url;
        var host = l.hostname.split(".");
        var len = host.length;
        if (len > 2) {
            result = host[len-2] + "." +host[len-1];
        }
        else
            result = l.hostname;
        return result;
    };
};