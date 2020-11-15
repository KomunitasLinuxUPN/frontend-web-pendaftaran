/*
 * Firebase payload types for Sign up or Sign in with email & password
 *
 * Source:
 * https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
 *
 */

// Both for signup or signin request body payloads
export interface FirebaseAuthRequestBody {
  email: string
  password: string
  returnSecureToken: boolean
}

// For signup response body payload
export interface FirebaseSignupResponseBody {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  kind: string
}

// For signin response body payload
export interface FirebaseSigninResponseBody {
  displayName: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  kind: string
  registered: boolean
}
