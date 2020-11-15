// import { GetterTree, ActionTree, MutationTree } from 'vuex'
// import cookie from 'js-cookie'

// import {
//   FirebaseSignupResponseBody,
//   FirebaseAuthRequestBody,
//   FirebaseSigninResponseBody,
// } from '@/models/admin/FirebaseAuth'
// import { AdminAuthData, AdminAuthInput } from '@/models/admin/Admin'
// import { RootState } from './index'

// /*
//  * Namespace
//  */
// export const AUTH = 'auth'

// /*
//  * State
//  */
// export const state = () => ({
//   uid: null as string | null,
//   token: null as string | null,
// })

// export type AuthState = ReturnType<typeof state>

// /*
//  * Getters
//  */
// export const GetterType = {
//   USER_ID: 'getUserId',
//   TOKEN: 'getToken',
//   IS_AUTHENTICATED: 'isAuthenticated',
// }

// export const getters: GetterTree<AuthState, RootState> = {
//   [GetterType.USER_ID](state) {
//     return state.userId
//   },
//   [GetterType.TOKEN](state) {
//     return state.token
//   },
//   [GetterType.IS_AUTHENTICATED](state) {
//     return !!state.token
//   },
// }

// /*
//  * Mutations
//  */
// export const MutationType = {
//   SET_USER: 'setUser',
//   CLEAR_TOKEN: 'clearToken',
// }

// export const mutations: MutationTree<AuthState> = {
//   [MutationType.SET_USER](state, userAuthData: AuthState) {
//     state.userId = userAuthData.userId
//     state.token = userAuthData.token
//   },
//   [MutationType.CLEAR_TOKEN](state) {
//     state.token = null
//   },
// }

// /*
//  * Actions
//  */
// export const ActionType = {
//   SIGN_UP: 'signUp',
//   LOGIN: 'signIn',
//   SET_LOGOUT_TIMER: 'setLogoutTimer',
//   TRY_AUTO_LOGIN: 'tryAutoLogin',
//   LOGOUT: 'logout',
// }

// enum LocalStorage {
//   USER_ID = 'userId',
//   TOKEN = 'token',
//   TOKEN_EXPIRATION_DATE = 'tokenExpiration',
// }

// // For storing user auth data in both local storage as well as the cookies
// function saveUserAuthData(userAuthData: UserAuthData) {
//   if (
//     userAuthData.userId &&
//     userAuthData.token &&
//     userAuthData.tokenExpirationDate
//   ) {
//     localStorage.setItem(LocalStorage.USER_ID, userAuthData.userId)
//     localStorage.setItem(LocalStorage.TOKEN, userAuthData.token)
//     localStorage.setItem(
//       LocalStorage.TOKEN_EXPIRATION_DATE,
//       userAuthData.tokenExpirationDate.toString()
//     )

//     cookie.set(LocalStorage.USER_ID, userAuthData.userId)
//     cookie.set(LocalStorage.TOKEN, userAuthData.token)
//     cookie.set(
//       LocalStorage.TOKEN_EXPIRATION_DATE,
//       userAuthData.tokenExpirationDate.toString()
//     )
//   }
// }

// // For extracting user auth data from both local storage as well as the cookies
// function getUserAuthData(incomingCookie: string | undefined): UserAuthData {
//   const extractCookie = (incomingCookie: string, cookieName: LocalStorage) => {
//     return incomingCookie
//       .split(';')
//       .find((cookie) => cookie.trim().startsWith(`${cookieName}=`))
//       ?.split('=')[1]
//   }

//   if (process.server && incomingCookie) {
//     const userId = extractCookie(incomingCookie, LocalStorage.USER_ID)
//     const token = extractCookie(incomingCookie, LocalStorage.TOKEN)
//     const tokenExpirationDate = extractCookie(
//       incomingCookie,
//       LocalStorage.TOKEN_EXPIRATION_DATE
//     )

//     return {
//       userId: userId || null,
//       token: token || null,
//       tokenExpirationDate: +(tokenExpirationDate || 0),
//     }
//   } else if (process.client) {
//     return {
//       userId: localStorage.getItem(LocalStorage.USER_ID),
//       token: localStorage.getItem(LocalStorage.TOKEN),
//       tokenExpirationDate: +(
//         localStorage.getItem(LocalStorage.TOKEN_EXPIRATION_DATE) || 0
//       ),
//     }
//   } else {
//     return {
//       userId: null,
//       token: null,
//       tokenExpirationDate: null,
//     }
//   }
// }

// // Clear user auth data from both local storage as well as the cookies
// function clearUserAuthData() {
//   if (process.client) {
//     localStorage.removeItem(LocalStorage.USER_ID)
//     localStorage.removeItem(LocalStorage.TOKEN)
//     localStorage.removeItem(LocalStorage.TOKEN_EXPIRATION_DATE)
//   }

//   cookie.remove(LocalStorage.USER_ID)
//   cookie.remove(LocalStorage.TOKEN)
//   cookie.remove(LocalStorage.TOKEN_EXPIRATION_DATE)
// }

// export const actions: ActionTree<AuthState, RootState> = {
//   async [ActionType.SIGN_UP](vuexContext, adminAuthInput: AdminAuthInput) {
//     try {
//       const response = await this.$axios.post<FirebaseSignupResponseBody>(
//         this.app.$config.firebaseSignUpURL + this.app.$config.firebaseKey,
//         {
//           email: adminAuthInput.email,
//           password: adminAuthInput.password,
//           returnSecureToken: true,
//         } as FirebaseAuthRequestBody
//       )

//       if (response.status > 400) {
//         throw new Error('Failed to signup')
//       }

//       // const tokenExpirationDuration = 5000 --> for testing auto logout
//       const tokenExpirationDuration = +response.data.expiresIn * 1000
//       const tokenExpirationDate = new Date().getTime() + tokenExpirationDuration

//       saveUserAuthData({
//         userId: response.data.localId,
//         token: response.data.idToken,
//         tokenExpirationDate,
//       })

//       vuexContext.commit(MutationType.SET_USER, {
//         userId: response.data.localId,
//         token: response.data.idToken,
//         didAutoLogout: false,
//       } as AuthState)
//     } catch (error) {
//       switch (error.response.data.error.message) {
//         case 'EMAIL_EXISTS':
//           throw new Error('The email is already in use by another account')
//         default:
//           throw error
//       }
//     }
//   },
//   async [ActionType.LOGIN](vuexContext, userAuthInput: UserAuthInput) {
//     try {
//       const response = await this.$axios.post<FirebaseSigninResponseBody>(
//         this.app.$config.firebaseLoginURL + this.app.$config.firebaseKey,
//         {
//           email: userAuthInput.email,
//           password: userAuthInput.password,
//           returnSecureToken: true,
//         } as FirebaseAuthRequestBody
//       )

//       if (response.status > 400) {
//         throw new Error('Failed to login')
//       }

//       // const tokenExpirationDuration = 5000 --> for testing auto logout
//       const tokenExpirationDuration = +response.data.expiresIn * 1000
//       const tokenExpirationDate = new Date().getTime() + tokenExpirationDuration

//       saveUserAuthData({
//         userId: response.data.localId,
//         token: response.data.idToken,
//         tokenExpirationDate,
//       })

//       vuexContext.commit(MutationType.SET_USER, {
//         userId: response.data.localId,
//         token: response.data.idToken,
//         didAutoLogout: false,
//       } as AuthState)
//     } catch (error) {
//       switch (error.response.data.error.message) {
//         case 'EMAIL_NOT_FOUND':
//           throw new Error('There is no user registered with that email address')
//         case 'INVALID_PASSWORD':
//           throw new Error('The password is invalid')
//         case 'USER_DISABLED':
//           throw new Error(
//             'The user account has been disabled by an administrator'
//           )
//         default:
//           throw error
//       }
//     }
//   },
//   [ActionType.TRY_AUTO_LOGIN](vuexContext, cookie: string | undefined) {
//     const userAuthData = getUserAuthData(cookie)

//     if (
//       userAuthData.token &&
//       userAuthData.userId &&
//       userAuthData.tokenExpirationDate
//     ) {
//       const tokenExpirationDate =
//         userAuthData.tokenExpirationDate - new Date().getTime()

//       if (tokenExpirationDate < 0) {
//         vuexContext.dispatch(ActionType.LOGOUT)
//       } else {
//         vuexContext.commit(MutationType.SET_USER, {
//           userId: userAuthData.userId,
//           token: userAuthData.token,
//           didAutoLogout: false,
//         } as AuthState)
//       }
//     }
//   },
//   [ActionType.LOGOUT](vuexContext) {
//     clearUserAuthData()
//     vuexContext.commit(MutationType.SET_USER, {
//       userId: null,
//       token: null,
//     } as AuthState)
//   },
// }
