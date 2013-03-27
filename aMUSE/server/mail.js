var mail=require('mailer');

module.exports = function(to, pass) {
    mail.send({
    ssl: true,
    host : "smtp.gmail.com",              // smtp server hostname
    port : 465,                     // smtp server port
    domain : "[localhost]",            // domain used by client to identify itself to server
    to : to,
    from : "amuse.registrazione@gmail.com",
    subject : "aMuse - Registration data",
    template: "./sample-html.txt",
    data : {
            password: pass,
            email: to
        },
    authentication : "login",       // auth login is supported; anything else is no auth
    username : "amuse.registrazione@gmail.com",       // Base64 encoded username
    password : "ABCdef1234!",     // Base64 encoded password
    debug: true  
},
function(err, result){
  if(err) console.log(err); 
});
};