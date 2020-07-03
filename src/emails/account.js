const sgMail=require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to:'golu24jun@gmail.com',
//     from:'golu24jun@gmail.com',
//     subject:'Ths is my first creation!',
//     text:'I hope this one actually gets to you'
// })

const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'golu24jun@gmail.com',
        subject:'Thanks for joining in!',
        text:`Welcome to the app, ${name}.Let me know how you get along with the app`
        
    })
}

const sendCancellationEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'golu24jun@gmail.com',
        subject:'Thanks for using our services !',
        text:`Hi ${name}.Let us know why you quit the app`
        
    })
}

module.exports={
    sendWelcomeEmail,
    sendCancellationEmail
}