'use strict';




function CheckUri(url) {
  return new Promise(function (resolve, reject){
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url , true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(xhr.responseText);
        }
      };
      xhr.send();
    }
    catch(e) {
      reject(e);
    }
  });
}

function removeUrlFromHistory(url) {
  return new Promise(function(resolve, reject) {
    try {
      chrome.history.deleteUrl({url: url}, function () {
        resolve('Ok');
      });
    }
    catch (e) {
      reject(e);
    }
  });
}

chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
  CheckUri(details.url).then(function(status) {
      return status;
  })
  ,then(function(status){
      if (status.stat === 'DELETE') {
        removeUrlFromHistory(status.url);
      }
  })
  .catch(function(err) {
      console.log('Error',err);
  });
});
chrome.browserAction.setBadgeText({text: 'CH'});

