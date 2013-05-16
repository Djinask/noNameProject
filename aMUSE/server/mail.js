var mail=require('nodemailer');

var smtpTransport = mail.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "amuse.registrazione@gmail.com",
        pass: "ABCdef1234!"
    }
});

var mailOptions = {
    from: "aMUSE registration <amuse.registrazione@gmail.com>", // sender address
    to: null, // list of receivers
    subject: "aMUSE registration", // Subject line
    html: null // html body
}

var html1 = "<p>Ciao! La tua password è: ";
var html2 = "</p><p>Per visualizzare il tuo photobook vai al seguente link: <a herf=\"http://www.amusethemuse.com/";
var html3 = "\">http://www.amusethemuse.com/";
var html4 = "</a></p>";

function html(to, pass) {
    return html1 + pass + html2 + to + html3 + to + html4;
}

module.exports = function(to, pass) {

    mailOptions.to = to;
    mailOptions.html = html(to, pass);


    smtpTransport.sendMail(mailOptions, function(err, result){
      if(err) console.log(err); 
    });
};