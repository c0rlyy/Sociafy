export  const BASE_URL='http://localhost:8000/api/v1'

export const authURL = {
  loginURL: `${BASE_URL}/login/access-token`,
  registerURL: `${BASE_URL}/users`,
  currentUserURL: `${BASE_URL}/users/me`
  }
