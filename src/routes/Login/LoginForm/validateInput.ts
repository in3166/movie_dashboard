function validatePassword(value: string | number) {
  const temp = value.toString();
  const validTwoType1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{10,}$/.test(temp);
  if (validTwoType1) return true;

  const validTwoType2 = /^(?=.*[A-Za-z])(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/.test(temp);
  if (validTwoType2) return true;

  const validTwoType3 = /^(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/.test(temp);
  if (validTwoType3) return true;

  const validThreeType = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(temp);
  if (validThreeType) return true;
  return false;
}

function isNotRecommendPassword(value: string | number) {
  const temp = value.toString();

  const repeatedNumbers = /(\d)\1(\d)\1/.test(temp);
  const phoneType = /01(0|1|6|7|8|9)?([0-9]{3,4})?([0-9]{4})$/.test(temp);
  const birthType = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/.test(temp);

  const isSimilarToEmail = (email: string) => {
    const emailId = email.split('@')[0];
    let rp = 2;
    let tempString = `${emailId[0] + emailId[1] + emailId[2]}`;
    while (rp < emailId.length) {
      if (temp.match(tempString)) return true;
      rp += 1;
      tempString = tempString.substring(1) + emailId[rp];
    }
    return false;
  };

  return { repeatedNumbers, phoneType, birthType, isSimilarToEmail };
}

function validateEmail(value: string | number) {
  const temp = value.toString();
  return /^[0-9a-zA-Z][0-9a-zA-Z\\_\-\\.\\+]+[0-9a-zA-Z]@[0-9a-zA-Z][0-9a-zA-Z\\_\\-]*[0-9a-zA-Z](\.[a-zA-Z]{2,6}){1,2}$$/i.test(
    temp
  );
}

export { validatePassword, validateEmail, isNotRecommendPassword };
