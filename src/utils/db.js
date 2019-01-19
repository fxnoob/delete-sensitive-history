

export default class Db {
    constructor(){}
    /*
   * set values in db
   * input - {key: value}
   * */
    set(params) {
        return new Promise((resolve, reject) => {
            try {
                chrome.storage.sync.set(params, function(){
                    resolve(params);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /*
    * get values from db
    * input - [key1,key2]
    * */
    get(params) {
        return new Promise((resolve, reject) => {
            try {
                chrome.storage.local.get(params, function(items){
                    resolve(items);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
}