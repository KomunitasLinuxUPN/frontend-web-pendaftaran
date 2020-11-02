export default interface Project {
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
