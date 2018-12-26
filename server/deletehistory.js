const SafeBrowse = require('safe-browse');
const express = require('nraf');
const app = express();

app.get('/', function (req, res) {
  var url = req.query.url;
  if( !url ) {
    return res.end(JSON.stringify({"message": "url parameter is must"}));
  }
  var api = new SafeBrowse.Api("API Key");
  api.lookup(url, function(error, data) {
    if (error) {
      console.error(error);
      return res.end(JSON.stringify(error));
    }
    return res.end(JSON.stringify(data));
  });
});

app.listen(process.env.PORT || 8080, () => {
	console.log('Server Running');
});




