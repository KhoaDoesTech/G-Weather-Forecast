"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmEmailTemplate = void 0;
const confirmEmailTemplate = (url) => {
    return `
  <!DOCTYPE html>
  <html>
  <body>
    <p>Please confirm your email by clicking the following link:</p>
    <a href="#" id="confirmLink">Confirm</a>

    <script>
      const confirmLink = document.getElementById('confirmLink');
      const confirmationLink = ${url};

      confirmLink.addEventListener('click', async (event) => {
        event.preventDefault();
        try {
          await fetch(confirmationLink, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Confirmation email sent successfully!');
        } catch (error) {
          console.error('Error sending confirmation email:', error);
        }
      });
    </script>
  </body>
  </html>
  `;
};
exports.confirmEmailTemplate = confirmEmailTemplate;
//# sourceMappingURL=email.template.js.map