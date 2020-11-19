const accountSid = "AC0b293e43223c93732c5bbd4a33da92b7";
const authToken = "742947363029f8be1622b2ce0c630ad1";
const client = require('twilio')(accountSid, authToken);
module.exports = async function sendSms(numTelTwilio,numTel,message,Prenom ,Nom ) {
    await client.messages
        .create({
            body: "Salut "+Prenom+" "+Nom+" votre mot de compte a ete  " + message,
            from: numTelTwilio,
            to: '+221' + numTel
        })
        .then(message => console.log(message.sid))
        .catch((err)=>{console.log(err)})
        .done();
    return numTel;
}