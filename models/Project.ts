export interface InputProject {
  title: string
  due: string
  content: string
}

export default interface Project extends InputProject {
  id: string
  status: string
  person: {
    id: string
    name: string
  }
}
