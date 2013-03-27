var mail=require('mailer');

  for(var i = 0; i < 1; i++){
    mail.send({
      ssl: true,
        host : "smtp.gmail.com",              // smtp server hostname
        port : 465,                     // smtp server port
        domain : "[localhost]",            // domain used by client to identify itself to server
        to : "m.lion920@gmail.com",
        from : "amuse.registrazione@gmail.com",
        subject : "node_mailer test email",
        body: "Hello! This is a test of the node_mailer.",
        authentication : "login",        // auth login is supported; anything else is no auth
        username : "amuse.registrazione@gmail.com",       // Base64 encoded username
        password : "ABCdef1234!",     // Base64 encoded password
        debug: true  },
function(err, result){
  if(err){ console.log(err); }
});