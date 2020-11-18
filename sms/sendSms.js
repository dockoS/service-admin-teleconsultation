const accountSid = "AC0b293e43223c93732c5bbd4a33da92b7";
const authToken = "3fe2f51a6cff541632eba6a3c4d21b46";
const client = require('twilio')(accountSid, authToken);
module.exports = async function sendSms(numTelTwilio,numTelPatient, password) {
    await client.messages
        .create({
            body: "Votre mot de passe est " + password + " .Vous pouvez le changer a tout moment .PS: C'est confidentiel",
            from: numTelTwilio,
            to: '+221' + numTelPatient
        })
        .then(message => console.log(message.sid))
        .catch((err)=>{console.log(err)})
        .done();
    return numTelPatient;
}
