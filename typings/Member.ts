/*
 * MemberInput adalah struktur data inputan dari form registrasi member
 */
export interface MemberInput {
  name: string | null
  address: string | null
  generation: number | null
  department: string | null
  email: string | null
  phone: string | null
  lineID: string | null
  photo: File | null

  [attr: string]: any | null
}

/*
 * FirestoreMember adalah struktur response data balikan dari entitas member
 * ketika get data members dari firestore
 */
export interface FirestoreMember {
  name: string
  address: string
  generation: number
  department: string
  email: string
  phone: string
  lineID: string
  photoURL: string
  verification: {
    isVerified: boolean
    token: string
  }

  [attr: string]: any
}

/*
 * Member adalah struktur data lengkap member
 */
export interface Member extends FirestoreMember {
  id: string
}

/*
 * SimpleMember adalah struktur data member dalam bentuk yang simpel.
 * Digunakan untuk menampilkan data member kepada publik.
 * Data yang ditampilkan simpel saja, tidak perlu lengkap
 */
export interface SimpleMember {
  name: string
  generation: number
  department: string
  isVerified: boolean
}
