var express = require('express');
var bodyParser = require('body-parser') // importing body parser middleware to parse form content from HTML
var cors = require('./../cors');
const emailRouter = express.Router();
var nodemailer = require('nodemailer'); //importing node mailer

emailRouter.route('/')
    .options(cors.cors, (req, res) => {
        console.log("Coming email here");
        res.sendStatus(200);
    })

// route which captures form details and sends it to your personal mail
.post(cors.cors, (req, res, next) => {

    console.log("oooo", req.body.nome, req.body.email, req.body.telefono, req.body.note)
        /*Transport service is used by node mailer to send emails, it takes service and auth object as parameters.
          here we are using gmail as our service 
          In Auth object , we specify our email and password
        */
    var transporter = nodemailer.createTransport({
        host: 'smtps.aruba.it',
        auth: {
            user: 'a.melis@tecnit.it', //replace with your email
            pass: 'Sys.T3c@H725' //replace with your password
        }
    });

    /*
      In mail options we specify from and to address, subject and HTML content.
      In our case , we use our personal email as from and to address,
      Subject is Contact name and 
      html is our form details which we parsed using bodyParser.
    */
    var mailOptions = {
        from: 'a.melis@tecnit.it', //replace with your email
        to: 'd.ucchesu@tecnit.it', //replace with your email
        subject: `Richiesta informazioni Form Dashboard Progetti`,
        html: '<h5>Buongiorno</h5><p>Richiesta informazioni!</p><p>Nome e cognome: ' + req.body.nome + '</p><p>Email: ' + req.body.email + '</p><p>Telefono: ' + req.body.telefono + '</p><p>Note: ' + req.body.note + '</p><p>Cordiali Saluti</p>'
    };

    /* Here comes the important part, sendMail is the method which actually sends email, it takes mail options and
     call back as parameter 
    */

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.send('error') // if error occurs send error as response to client
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Sent Successfully') //if mail is sent successfully send Sent successfully as response
        }
    });
})


module.exports = emailRouter;