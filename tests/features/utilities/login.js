export default (browser) => {
  browser
    .setValue('input[type=email]', 'test@test.com')
    .setValue('input[type=password]', 'testing')
    .submitForm();
};
