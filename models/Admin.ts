export interface AdminSignInInput {
  email: string | null
  password: string | null
}

export interface Admin {
  uid: string | null
  name: string | null
  email: string | null
  photoURL: string | null
}
