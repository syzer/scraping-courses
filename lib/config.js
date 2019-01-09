const dotenv = require('dotenv').config()

module.exports = () => {
  console.log('loading credentials')
  const { USER: user, PASS: pass } = dotenv.parsed
  if (!user || !pass) {
    throw new Error(`Credentials are incomplete, please enter USER & PASS`)
  }
  return {
    user,
    pass
  }
}
