const SafeBrowse = require('safe-browse');
const express = require('express');
const app = express();

app.get('/', function (req, res) {
  var url = req.params.url;
  var api = new SafeBrowse.Api("API KEY");
  api.lookup(url, function ( error, data )
    if (error) {
      console.error(error);
      return res.json(error);
    }
  } );
  return res.send(JSON.stringify(data));
});

app.listen(process.env.PORT || 8080);




