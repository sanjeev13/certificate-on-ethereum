var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var contractApi = require('./api/contractApi');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','pug');

var server = app.listen(3000);

var logPrefix = "app: ";

app.route('/ts-cert')
.get(function(req,res){
  res.render('getCertificate',{});
})
app.route('/ts-cert/add')
.get(function(req,res){
  res.render('addCertificate',{});
})

app.route('/certificate')
.get(function(req,res){
  var id = req.query['id'];
  console.log(logPrefix+"GET certificate id: "+id);
  return contractApi.getCertificate(id).then(function(certificate){
    if(!certificate){
      var msg = "Certificate not found for given Id: "+id;
      res.render('getCertificate',{msg:msg});
    }else{
      fs.readFile('./data/transactions.json', function(err, data) {
        var json = JSON.parse(data);
        certificate['tx'] = json[id];
        console.log(logPrefix+"Certificate: "+certificate.tx);
        res.render('showCertificate',{certificate:certificate});
      });
    }
  })
})
.post(function(req,res){
  console.log(logPrefix+"POST certificate request body: "+JSON.stringify(req.body));
  var name = req.body.name;
  var grade = req.body.grade;
  var id = req.body.id;
  var date = formatedDate();
  // check if we have a certificate with same id
  return contractApi.getCertificate(id).then(function(certificate){
    if(!certificate){
      return contractApi.addCertificate(id,name,date,grade).then(function(tx){
        var msg = "Certificate added. Tx: "+tx;
        saveTx(id,tx);
        res.render('addCertificate',{msg:msg});
      });
    }else{
      var msg = "Certificate already exists for given Id: "+id;
      res.render('addCertificate',{msg:msg});
    }
  });
});

function saveTx(id,tx){
  fs.readFile('./data/transactions.json', function(err, data) {
    var json = JSON.parse(data);
    json[id] = tx;
    fs.writeFile('./data/transactions.json', JSON.stringify(json), function (err) {
      if (err) throw err;
      console.log('Saved Transation details at: '+__dirname+'/data/transactions.json');
    });
  });
}

function formatedDate() {
  var date = new Date();
  var month = '' + (date.getMonth() + 1);
  var day = '' + date.getDate();
  var year = date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
