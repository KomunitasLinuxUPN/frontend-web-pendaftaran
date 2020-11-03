export interface InputProject {}

export default interface Project extends InputProject {
  id: string
  title: string
  due: string
  status: string
  content: string
  person: {
    id: string
    name: string
  }
}
