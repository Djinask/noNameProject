var mail=require('nodemailer');

var smtpTransport = mail.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "amuse.registrazione@gmail.com",
        pass: "ABCdef1234!!"
    }
});

var mailOptions = {
    from: "aMUSE registration <amuse.registrazione@gmail.com>", // sender address
    to: null, // list of receivers
    subject: null, // Subject line
    html: null // html body
}

module.exports = function(to, subject, text) {

    mailOptions.to = to;
    mailOptions.html = text;
    mailOptions.subject = subject;


    smtpTransport.sendMail(mailOptions, function(err, result){
      if(err) console.log(err);
    });
};