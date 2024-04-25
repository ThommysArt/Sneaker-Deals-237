import emailjs from '@emailjs/browser'


emailjs.init({
  publicKey: "1fGvX8u7wygasmuQq",
  // Do not allow headless browsers
  blockHeadless: true,
  blockList: {
    // Block the suspended emails
    list: ['foo@emailjs.com', 'bar@emailjs.com'],
    // The variable contains the email address
    watchVariable: 'userEmail',
  },
  limitRate: {
    // Set the limit rate for the application
    id: 'app',
    // Allow 1 request per 10s
    throttle: 10000,
  },
});

type sendEmailProps = {
  to_email: string,
  sneaker_name: string,
  sneaker_price: number,
  sneaker_color: string,
  sneaker_size: number,
}

const sendEmail = (sendEmailProps: sendEmailProps) => {
  emailjs.send("service_5hz13rf", "template_3rpdkab", sendEmailProps);
}

export {sendEmail}