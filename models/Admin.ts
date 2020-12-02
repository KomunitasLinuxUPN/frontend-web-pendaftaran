/*
 * AdminSignInInput adalah struktur data inputan dari form login admin
 */
export interface AdminSignInInput {
  email: string | null
  password: string | null
}

/*
 * Admin adalah struktur data lengkap dari entitas admin
 * Digunakan sebagai struktur data dari session admin yang
 * disimpan di dalam store auth (vuex)
 */
export interface Admin {
  uid: string | null
  name: string | null
  email: string | null
  photoURL: string | null
}
