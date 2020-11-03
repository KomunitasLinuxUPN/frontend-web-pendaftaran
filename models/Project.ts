import firebase from 'firebase'

export interface InputProject {
  title: string | null
  content: string | null
  due: string | null
}

interface BaseProject {
  title: string
  due: string
  content: string
}

export interface FirestoreProject extends BaseProject {
  status: string
  person: firebase.firestore.DocumentReference
}

export interface Project extends BaseProject {
  id: string
  status: string
  person: {
    id: string
    name: string
  }
}
