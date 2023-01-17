function validatePassword(value: string | number) {
  const temp = value.toString();
  const validTwoType1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{10,}$/.test(temp);
  const validTwoType2 = /^(?=.*[A-Za-z])(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/.test(temp);
  const validTwoType3 = /^(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/.test(temp);
  const validThreeType = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(temp);

  return validTwoType1 || validTwoType2 || validTwoType3 || validThreeType;
}

function isNotRecommendPassword(value: string | number) {
  const temp = value.toString();
  const repeatedNumbers = /(\d)\1(\d)\1/.test(temp);
  const phoneType = /01(0|1|6|7|8|9)?([0-9]{3,4})?([0-9]{4})$/.test(temp);
  const birthType = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/.test(temp);

  return { repeatedNumbers, phoneType, birthType };
}

function validateEmail(value: string | number) {
  const temp = value.toString();
  return /^[0-9a-zA-Z][0-9a-zA-Z\\_\-\\.\\+]+[0-9a-zA-Z]@[0-9a-zA-Z][0-9a-zA-Z\\_\\-]*[0-9a-zA-Z](\.[a-zA-Z]{2,6}){1,2}$$/i.test(
    temp
  );
}

export { validatePassword, validateEmail, isNotRecommendPassword };
