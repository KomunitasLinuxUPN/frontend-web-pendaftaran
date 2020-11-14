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

export interface Member extends FirestoreMember {
  id: string
}
