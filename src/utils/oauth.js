
export default class oauth {
    constructor(){};
    /*
    * get access token from google oauth
    * */
    getToken() {
        return new Promise((resolve, reject) => {
           try {
               chrome.identity.getAuthToken({interactive: true}, function(token) {
                   resolve(token);
               });
           }
           catch (e) {
               reject(e);
           }
        });
    }
    getUserContactsGroups() {
        return new Promise((resolve, reject) => {
           try {
               chrome.identity.getAuthToken({interactive: true}, function(token) {
                   let init = {
                       method: 'GET',
                       async: true,
                       headers: {
                           Authorization: 'Bearer ' + token,
                           'Content-Type': 'application/json'
                       },
                       'contentType': 'json'
                   };
                   fetch(
                       'https://people.googleapis.com/v1/contactGroups/all?maxMembers=20&key=AIzaSyA_YeG6Qfx33UxfEO9NC9D4SqEkszW4WoE',
                       init)
                       .then((response) => response.json())
                       .then(function(data) {
                           resolve(data)
                       });
               });
           }
           catch (e) {
               reject(e);
           }
        });
    };
}