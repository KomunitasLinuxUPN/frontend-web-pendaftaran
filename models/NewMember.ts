export interface NewMemberInput {
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

export interface FirestoreNewMember {
  name: string
  address: string
  generation: number
  department: string
  email: string
  phone: string
  lineID: string
  photoURL: string
}

export interface NewMember extends FirestoreNewMember {
  id: string
}
