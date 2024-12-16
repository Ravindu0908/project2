const welcomeEmail = (email , password, name) => {
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
      .wrapper {
        display: flex;
        justify-content: center;
        width: 100%;
        text-align: center;
      }
      .wrapper span {
        display: inline-block;
        padding: 10px 20px;
        background-color: #ff3be5;
        color: #fff;
        font-size: 36px;
        font-weight: bold;
        border-radius: 5px;
        text-align: center;
        margin: 30px 0px;
      }
    </style>
  </head>
  <body>
    <div class="container">
        <h2 style="line-height: 0">Ruby Beauty Parlour</h2>
        <p>Welcome</p>
        <p style="padding-top: 30px">Hi ${name},</p>
        <p>We are excited to have you on board. Your account has been created successfully by our admin.</p>
        <p>Here are your account details:</p>
        <p>Email: ${email}</p>
        <p>Password: ${password}</p>
        <p>Please change your password after your first login.</p>
        <p>If you did not request this account creation, please contact us.</p>
        <p>Thank you!</p>
    </div>
  </body>
</html>
`;
};

module.exports = { welcomeEmail };
