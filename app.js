var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  res.write('\
    <style> body{ margin: 0px; } </style> \
<iframe border="0" frameborder="0" marginwidth="0" marginheight="0" width="100%" height="100%" src="http://man.jcloud.com/appengine/jae/hello.html"> </iframe> \
  ');
  res.end();
}).listen(process.env.VMC_APP_PORT || 1337, null);
