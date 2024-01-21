const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function validateEmail(email?: string) {
    if (!email) {
        return false;
    }
  
    const emailParts = email.split('@');
  
    if (emailParts.length !== 2) {
        return false;
    }
  
    const account = emailParts[0];
    const address = emailParts[1];

    if (!account || !address) {
        return false;
    }

    if (account.length > 64) {
        return false;
    }
    else if (address.length > 255) {
        return false;
    }
  
    if (address.split('.').some((part) => part.length > 63)) {
        return false;
    }
  
    return tester.test(email);
  };