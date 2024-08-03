const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async(password) => {
    const hashPassword = await bcrypt.hash(password, saltRounds)
    return hashPassword;
}

const comparePassword = async(password, hashPassword) => {
    const result = await bcrypt.comparePassword(password, hashPassword)
    return result;
}

module.exports = {
    hashPassword,
    comparePassword,
};

