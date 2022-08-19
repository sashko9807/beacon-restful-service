const Users = require('./userModel');
const bcrypt = require('bcrypt');

const addNewUser = async (email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({ email: email, password: hashedPassword });
    return user
  } catch (err) {
    return null
  }
};



const findUserByEmail = async (email) => {
  const user = await Users.findOne({ email: email });
  return user;
};


const updateUserPassword = async (email, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await Users.findOneAndUpdate(
      {
        email: email,
      },
      { password: hashedPassword }
    );
    return user;
  } catch (err) {
    return null
  }
};



module.exports = {
  addNewUser,
  findUserByEmail,
  updateUserPassword,
};
