import { toUpper, snakeCase } from 'lodash'
import moment from 'moment'
export function calculateAge(dateOfBirth) {
  const ageInYears = moment().diff(dateOfBirth, `years`)
  if (ageInYears > 0) return ageInYears
  return `< 1`
}

export function orphanFullName(orphan) {
  return `${orphan.name} ${orphan.father.firstName} ${orphan.father.middleName}`
}

export function fullName(person) {
  return `${person?.firstName} ${person?.middleName} ${person?.lastName}`
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

export function getObjectDiff(instance, other) {
  const diff = {}
  for (const key in instance) {
    if (instance[key] !== other[key]) {
      if (Array.isArray(instance[key])) {
        diff[key] = instance[key].filter((item) => !other[key].includes(item))
      }
      diff[key] = other[key]
    }
  }
  return diff
}

export function formatToISOString(dateString) {
  return new Date(dateString).toISOString()
}

export function formatToDatePicker(date) {
  return date && date.split('T')[0]
}
