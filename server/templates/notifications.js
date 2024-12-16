const notificationsTemplate = (name, date, time, service) => {
  return `
    <!DOCTYPE html>
<html>
  <head>
    <title>Email Verification</title>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #fff;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
      }
      h2 {
        color: #333;
        margin-bottom: 20px;
      }
      p {
        margin-bottom: 5px;
        color: #333;
        font-size: 16px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2 style="line-height: 0">
        Ruby Beauty Parlour -
        <span style="color: rgb(243, 0, 190)"> Reminder </span>
      </h2>
      <p style="padding: 10px 0">Hi, ${name}</p>
      <p>
        This is a reminder for your appointment with Ruby Beauty Parlour. Please
        make sure you arrive on time.
      </p>

      <div style="padding: 16px 0">
        <p style="font-weight: bold">Appointment Details:</p>
        <p>Service: ${service}</p>
        <p>Your appointment is scheduled on ${date} at ${time}.</p>
      </div>
      <p>
        For any queries, please contact us at
        <a href="mailto:contacts@rubybeauty.com"> contacts@rubybeauty.com </a>
      </p>
      <p>Thank you!</p>
    </div>
  </body>
</html>
`;
};

module.exports = { notificationsTemplate };
