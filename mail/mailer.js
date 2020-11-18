module.exports = async function sendEmail(prenom, nom, destinataire, id) {
   const nodemailer = require("nodemailer");
    const { google } = require("googleapis");
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
        '415276129028-rtflm2p3urkqqsqhkahe6b9aflv53cr7.apps.googleusercontent.com', // ClientID
        "B20ubj8MvCSmn6ryHzpxHOdo", // Client Secret
        "https://developers.google.com/oauthplayground" // Redirect URL
    );

    oauth2Client.setCredentials({
        refresh_token: "1/qkLGR8_AO6b-xv8_gZe0JOp5Hp1caLN1V4sWvmg5REeB7omoRDSNxn_DCWWtLWUu"
    });
    const tokens = await oauth2Client.refreshAccessToken()
    const accessToken = tokens.credentials.access_token
    const smtpTransport = nodemailer.createTransport({

        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "geoportail.ird@gmail.com",
            clientId: "415276129028-rtflm2p3urkqqsqhkahe6b9aflv53cr7.apps.googleusercontent.com",
            clientSecret: "B20ubj8MvCSmn6ryHzpxHOdo",
            refreshToken: "1/qkLGR8_AO6b-xv8_gZe0JOp5Hp1caLN1V4sWvmg5REeB7omoRDSNxn_DCWWtLWUu",
            accessToken: accessToken
        }
    });
    const mailOptions = {

        from: "geoportail.ird@gmail.com",

        to: destinataire,

        subject: "Inscription comme administrateur du geoportail ",

        generateTextFromHTML: true,

        html: "salut  <h2> " + prenom + " " + nom + " </h2>  <br >" +
            "<h4> veuillez aller sur ce lien pour creer votre mot de passworde et terminer votre inscription en tant qu administrateur: " + "https://localhost:5000/admin/createpassword/" + id + "</h4>"
    };
    smtpTransport.sendMail(mailOptions, (error, response) => {
            error ? console.log(error) : console.log(response);
            smtpTransport
                .close();
        }) 
}