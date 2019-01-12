const checkCleanUrl = require('@vipulbhj/clean-url');
const nraf = require('nraf');
const app = nraf();

app.get('/', (req, res) => {
  const url = req.query.url;
  if( !url ) {
    res.json({"message": "url parameter is must"});
    return res.end();
  }
  if(!checkCleanUrl(url)) {
    res.json({
       "message": "Url hosts pornographical content",
       "cleanUrl" : false
    });
    return res.end();
  } else {
    res.json({
        "message": "Url hosts no pornographical content",
        "cleanUrl" : true
    });
    return res.end();
  }
});



app.listen(process.env.PORT || 8080, () => {
	console.log('Server Running');
});




