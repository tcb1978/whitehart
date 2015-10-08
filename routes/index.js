var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/contact', function(req, res){
    var mandrill = require('mandrill-api/mandrill'),
        body = req.body,
        mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_API_KEY),
        message = {
            "from_name" : body.name,
            "from_email" : body.email,
            "html" : "<p>message: " + body.message + "<br><br>number : " + body.number + "</p>",
            "subject" : "Whitehart Contact Form Message",
            "to" : [{
                "email" : "jeff@jeffskelton.net",
                "name" : "Whitehart",
                "type" : "to"
            }],
            "headers" : {
                "Reply-To" : "hello@ayo.co"
            }
        };

    mandrill_client.messages.send({ "message" : message }, function(result){
        console.log(result);
        var messageSent = result[0].status === 'sent';
        if(!messageSent){
            return res.status(500).send(result[0].reject_reason || 'message send error');
        }
        return res.send({ success : true });
    }, function(err){
        return res.status(500).send(err);
    });
});

module.exports = router;
