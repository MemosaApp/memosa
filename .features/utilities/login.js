export default (browser) => {
  browser
    .setValue('input[type=email]', 'idmontie@gmail.com')
    .setValue('input[type=password]', 'testing')
    .submitForm();
};
