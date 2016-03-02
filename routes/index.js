var express = require('express');
var router = express.Router();
var api_key = process.env.MAILGUN_API_KEY;
var domain = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var mailcomposer = require('mailcomposer');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});


router.post('/contact', function (req, res) {
  var body = req.body;

  var mail = mailcomposer({
    from: body.name + '<' + body.email + '>',
    to: process.env.CONTACT_FORM_EMAIL,
    subject: "Whitehart Contact Form Message",
    html: composeMessageBodyHTML(body)
  });

  mail.build(function (err, message){
    if(err) {
      return res.status(500).send(err);
    }
    mailgun.messages().sendMime({
      to : process.env.CONTACT_FORM_EMAIL,
      message : message.toString('ascii')
    }, function (err, body) {
      if(err) {
        return res.status(500).send(err);
      }
      console.log(body);
      return res.send({success: true});
    });
  });

  function composeMessageBodyHTML(body) {
    var html = '<div style="font-family:Arial">';
    html += 'Name : ' + body.name  + '<br><br>';
    html += 'Phone Number : ' + (body.number || '(no number)') + '<br><br>';
    html += 'Email : ' + body.email + '<br><br>';
    html += 'Message: ' + (body.message || '(no message)') + '<br><br>';
    html += '</div>';
    return html;
  }
});

module.exports = router;
