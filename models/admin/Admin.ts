// User auth input type (for firebase)
export interface AdminAuthInput {
  email: string | null
  password: string | null
  [attr: string]: any
}

// User auth data type (for local storage & cookie)
export interface AdminAuthData {
  uid: string | null
  token: string | null
  tokenExpirationDate: number | null
}

export default interface Admin extends AdminAuthData {
  name: string | null
  email: string | null
  avatar: string | null
}
