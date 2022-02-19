const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

require('dotenv').config()
const sendMail = require('./mail2')
const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user:process.env.G_email,
        pass: process.env.G_pass,
    },
}));


async function contact(req, res) {
    try {
        const response = await transporter.sendMail({
            from: '"ttt <abdelrhman.soleman98@gmail.com>', // sender address
            to: "a.soliman@egyptsmartcards.com", // list of receivers
            subject: `*teeeest*`, // Subject line
            html: `asdasdsadqasdasd<br/><br/>asdasdadasdasdadsadsasdadsads</b>`, // html body
        });
    } catch (error) {
        console.log(error);
    }
}

// sendMail({
//     to: "a.soliman@egyptsmartcards.com",
//     text: "this mail for",
//     subject: `*teeeest*`,
//     html:`asdasdsadqasdasd<br/><br/>asdasdadasdasdadsadsasdadsads</b>`
// })
// contact()
// export default contact;

