const beauticiansApprovedTemplate = (name, url) => {
  return `
    <!DOCTYPE html>
<html>
  <head>
    <title>Account Approval Notification</title>
  </head>
  <body>
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif">
      <h2 style="color: #ff69b4">Hello ${name},</h2>
      <p style="color: #444444">
        We are pleased to inform you that your beautician account has been
        approved!
      </p>
      <p style="color: #444444">
        You can now start offering your beauty services on our platform. To get
        started, please log in to your account.
      </p>
      <a
        href="${url}/login"
        style="
          background-color: #ff69b4;
          color: white;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
          border: none;
        "
        >Log in</a
      >
      <p style="color: #444444">
        If you have any questions or need assistance, please don't hesitate to
        contact us.
      </p>
      <p style="color: #444444">Best regards,</p>
      <p style="color: #444444">Administration</p>
      <p style="color: #444444">Ruby Beauty Parlour</p>
    </div>
  </body>
</html>

    `;
};

module.exports = { beauticiansApprovedTemplate };
