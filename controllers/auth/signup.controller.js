const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { addNewUser } = require("../../DB/qureyExecutors/user.exec");
const mailVerification = require("./mailVerification.controller");

async function auth_signUp(userData) {
  userData.password = bcrypt.hashSync(userData?.password, 10);
  const result = await addNewUser(userData);
  if (result?.isAdded) {
    const mailVer = new mailVerification(result?.data);
    mailVer.createMailVerification();
    return result;
  } else {
    return result;
  }
}
async function auth_verifyMail(hash) {
    const mailVer = new mailVerification();
    return await mailVer.verifyMail(hash)
}

module.exports = {
  auth_signUp,
  auth_verifyMail
};
