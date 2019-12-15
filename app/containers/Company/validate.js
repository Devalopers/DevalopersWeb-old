export default function(fieldName, value) {
  return validationMap[fieldName](value);
}

const validationMap = {
  username: isUsernameValid,
  password: isPasswordValid,
  email: isEmailValid,
  phone: isPhoneValid,
  'company-name': isCompanyNameValid,
  'company-industry': isCompanyIndustryValid,
  'company-website': isCompanyWebsiteValid,
  'company-size': isCompanySizeValid,
  'company-description': isCompanyDescriptionValid,
  code: isForgotPasswordVerificationCodeValid,
};

function isUsernameValid(username) {
  return {
    isValid: username.length >= 6 && username.length <= 9,
    criteria: 'between 6 and 9 chars',
  };
}

function isPasswordValid(password) {
  return {
    isValid:
      /^(?=.*[a-z])(?=.*[0-9])(?=.*\W).*$/.test(password) &&
      password.trim().length > 6,
    criteria: 'one small case, one high case, one symbol, and one number.',
  };
}

function isEmailValid(email) {
  return {
    // eslint-disable-next-line no-useless-escape
    isValid: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
    ),
    criteria: 'in the form abc@abc.com',
  };
}

function isPhoneValid(phone) {
  return {
    isValid:
      phone &&
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/.test(phone) &&
      phone.length > 6,
    criteria: 'in the form +9613000000',
  };
}

function isCompanyNameValid(companyName) {
  return {
    isValid: companyName.length >= 1 && companyName.length <= 250,
    criteria: 'not empty',
  };
}

function isCompanyIndustryValid(companyIndustry) {
  return {
    isValid: companyIndustry.length >= 1 && companyIndustry.length <= 2500,
    criteria: 'not empty',
  };
}

function isCompanyWebsiteValid(companyWebsite) {
  return {
    // eslint-disable-next-line no-useless-escape
    isValid: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
      companyWebsite,
    ),
    criteria: 'http://company-website.test',
  };
}

function isCompanySizeValid(companySize) {
  return {
    isValid: companySize >= 1,
    criteria: 'greater than 1',
  };
}

function isCompanyDescriptionValid(companyDescription) {
  return {
    isValid: companyDescription.length >= 1 && companyDescription.length <= 250,
    criteria: '< 250',
  };
}

function isForgotPasswordVerificationCodeValid(verificationCode) {
  return {
    isValid: verificationCode.length === 6,
    criteria: 'wrong verififcation code',
  };
}
