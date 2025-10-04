const { AppDataSource } = require('../data-source');
const UserEntity = require('../entities/User');

function getUserRepository() {
  return AppDataSource.getRepository(UserEntity);
}

async function createUser(user, referralToken) {
  const UserRepository = getUserRepository();
  const existingUser = await UserRepository.findOne({ where: { email: user.email } });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const newUser = UserRepository.create(user);

  if (referralToken) {
    const referrer = await UserRepository.findOne({ where: { referralCode: referralToken } });

    if (referrer) {
      newUser.referralUser = referrer.id;
      referrer.referralCodeCount += 1;
      await UserRepository.save(referrer);
    }
  }

  const savedUser = await UserRepository.save(newUser);
  return savedUser;
}

async function getUserByEmail(email) {
  const UserRepository = getUserRepository();
  const user = await UserRepository.findOne({ where: { email } });
  return user;
}


async function saveRefreshToken(userId, refreshToken) {
  const UserRepository = getUserRepository();

  const result = await UserRepository.update(userId, { refreshToken });

  if (result.affected === 0) {
    throw new Error('User not found');
  }

  return result;
}

async function getUserById(userId) {
  const UserRepository = getUserRepository();
  const user = await UserRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

module.exports = {
  createUser,
  getUserByEmail,
  saveRefreshToken,
  getUserById,
};
