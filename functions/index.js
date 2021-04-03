// Firebase Config
const functions = require("firebase-functions");
const { rejects } = require("node:assert");
const sendgrid = require("sendgrid");
const client = sendgrid(
  "j0wtislHTD6nvg67UvOLDw.sjpoBJm8km0LjMSdlLgyw1-i6zQ1Dp_CyShLx-cgngU"
);

function parseBody(body) {
  let helper = sendgrid.mail;
  let fromEmail = new helper.Email(body.from);
  let toEmail = new helper.Email(body.to);
  let subject = body.subject;
  let content = new helper.Mail(fromEmail, subject, toEmail, content);
  let mail = new helper.Mail(fromEmail, subject, toEmail, content);
  return mail.toJSON();
}

exports.httpEmail = functions.https.onRequest((req, res) => {
  return Promise.resolve()
    .then(() => {
      if (req.method !== "POST") {
        const error = new Error("Only POST request are acepted");
        error.code = 405;
        throw error;
      }

      const request = client.emptyRequest({
        method: "POST",
        path: "/v3/mail/send",
        body: parseBody(req.body),
      });

      return client.API(request);
    })
    .then((response) => {
      if (response.body) {
        res.send(response.body);
      } else {
        res.end();
      }
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
});
