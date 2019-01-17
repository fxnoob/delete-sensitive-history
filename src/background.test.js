import urlUtils from "./utils/urlutil";
import * as JsonData from "./data/websites";
const urlUtilsController = new urlUtils();

test("Clean url" , () => {
    const promise = urlUtilsController.cleanUrl("google.com");
    promise.then((dat) =>{
        console.log("success" , dat);
    }).catch((e) => {
        console.log("error", e);
    })
});
