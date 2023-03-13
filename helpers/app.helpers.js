import moment from 'moment'
export function calculateAge(dateOfBirth) {
  const ageInYears = moment().diff(dateOfBirth, `years`)
  if (ageInYears > 0) return ageInYears
  return `< 1`
}
