export interface AdminSignInInput {
  email: string | null
  password: string | null
  [attr: string]: any
}

export interface AdminEditInput {
  name: string | null
  password: string | null
  email: string | null
  photo: File | null
}

export interface Admin {
  uid: string | null
  name: string | null
  email: string | null
  photoURL: string | null
}
