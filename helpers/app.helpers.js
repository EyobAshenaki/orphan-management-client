import { toUpper, snakeCase } from 'lodash'
import moment from 'moment'
export function calculateAge(dateOfBirth) {
  const ageInYears = moment().diff(dateOfBirth, `years`)
  if (ageInYears > 0) return ageInYears
  return `< 1`
}

export function generatePassword() {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  const generator = () => {
    let digest = ''
    const maxLength = Math.floor(Math.random() * 8) + 8

    for (let i = 0; i < maxLength; i++) {
      const index = Math.floor(Math.random() * charset.length)
      digest += charset[index]
    }
    return digest
  }
  const password = generator()
  if (regex.test(password)) {
    return password
  }
  return generatePassword()
}

export function toEnumString(text) {
  return toUpper(snakeCase(text))
}
