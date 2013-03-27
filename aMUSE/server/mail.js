var mail=require('mailer');

module.exports = function(to, pass) {
    mail.send({
    ssl: true,
    host : "smtp.gmail.com",              // smtp server hostname
    port : 465,                     // smtp server port
    domain : "[localhost]",            // domain used by client to identify itself to server
    to : to,
    from : "amuse.registrazione@gmail.com",
    subject : "node_mailer test email",
    template: "./sample.txt",
    data : {
            "password": pass},
    authentication : "login",       // auth login is supported; anything else is no auth
    username : "amuse.registrazione@gmail.com",       // Base64 encoded username
    password : "ABCdef1234!",     // Base64 encoded password
    debug: true  
},
function(err, result){
  if(err) console.log(err); 
});
};