const express = require('express');
const compression = require('compression');
// const helmet = require('helmet');
// const historyApiFallback = require('connect-history-api-fallback');
// const { createProxyMiddleware } = require('http-proxy-middleware');

// const _API_URL="/__/uc/v1.0/";
const API_URL_V3="/ui/uic/v3/";
const API_URL_PUBLIC_V3="/public/uic/v3/";

const app = express();
const port = process.env.PORT || 7778;

const sessionData=require('./src/mock/auth.json');
const authData=require('./src/mock/auth.json');
const menuConfigsData=require('./src/mock/menu.json');


const SuccessData={
    "code": "Success",
    "message": "string",
    "data":{}
  }

app.use(compression());
// app.use(helmet());
//permisson
//console.log(sessionData)
app.get(API_URL_V3+'session', function (req, res) {
    res.send(sessionData)
});
app.get(API_URL_V3+'auth', function (req, res) {
    res.send(authData)
});
app.get(API_URL_V3+'menu', function (req, res) {
    res.send(menuConfigsData)
});

// app.get(API_URL_V3+'notifications/configuration/recipientGroup/*', function (req, res) {
//     res.send(webhookGroupData)
//   });

// app.post(API_URL_V3+'notifications/configuration/*/', function (req, res) {    
//     res.send(SuccessData)
//   });


// app.use(express.static(distPath));


app.listen(port, (err) => {
  console.log('port:',port);
  if (err) {
    console.log(err);
  }
})