declare module '*.vue' {
  import type { defineComponent } from '@nuxtjs/composition-api'
  const component: typeof defineComponent
  export default component
}
