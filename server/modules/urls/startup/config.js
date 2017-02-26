import { check } from 'meteor/check';

HTTP.methods({
  '/s/:shortId': {
    get() {
      const { shortId } = this.params;

      check(shortId, String);

      Meteor.call('url.visit', shortId);
      const longUrl = Meteor.call('url.expand', shortId);

      if (longUrl) {
        this.setStatusCode('301');
        this.addHeader('Location', longUrl);

        return (
  `<html>
    <head>
      <meta http-equiv="content-type" content="text/html;charset=utf-8">
      <title>Redirecting…</title>
    </head>
    <body>
      <h1>Redirecting…</h1>
      <a href="${longUrl}">Click here</a> if your browser does not automatically redirect you.
    </body>
  </html>`);
      } else {
        this.setStatusCode('500');
        return '';
      }
    },
  },
});
