<template>
  <v-dialog v-model="dialogIsOpen" eager max-width="600px">
    <template #activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-title>Pengaturan</v-list-item-title>
      </v-list-item>
    </template>

    <v-card>
      <v-card-title>
        <h2 class="title">Add a New Project</h2>
      </v-card-title>
      <v-card-text>
        <admin-form />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn :loading="isLoading" text class="accent ma-4" @click="submit">
          Add Project
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  reactive,
  ref,
  useContext,
} from '@nuxtjs/composition-api'

import { FirestoreProject, InputProject } from '@/models/Project'

interface VForm extends HTMLFormElement {
  reset(): void
  resetValidation(): void
  validate(): boolean
}

interface InputRules {
  (val: string | null): boolean | string
}

export default defineComponent({
  emits: ['project-added'],
  setup(_, { emit }) {
    const dialogIsOpen = ref(false)

    const formRef = ref<VForm>()

    const inputRules: InputRules[] = [
      (val: string | null) => {
        return (val && val.length > 0) || 'This input field must not be empty'
      },
    ]

    const inputProject = reactive<InputProject>({
      title: null,
      content: null,
      due: null,
    })

    const formattedDate = computed(() => {
      if (!inputProject.due) {
        inputProject.due = new Date().toISOString().substr(0, 10)
      }
      return new Date(inputProject.due).toUTCString().substr(0, 16)
    })

    const isLoading = ref(false)
    const { app, error } = useContext()

    async function submit() {
      if (formRef.value?.validate()) {
        try {
          isLoading.value = true

          const currentUser = app.$fire.auth.currentUser

          const project: FirestoreProject = {
            title: inputProject.title!,
            due: inputProject.due!,
            content: inputProject.content!,
            status: 'ongoing',
            person: app.$fire.firestore.doc(`persons/${currentUser?.uid}`),
          }

          await app.$fire.firestore.collection('projects').add(project)

          inputProject.title = null
          inputProject.content = null
          inputProject.due = null
          formRef.value.resetValidation()

          emit('project-added')
        } catch (err) {
          error(err)
        } finally {
          isLoading.value = false
          dialogIsOpen.value = false
        }
      }
    }

    return {
      dialogIsOpen,
      formRef,
      isLoading,
      inputRules,
      inputProject,
      formattedDate,
      submit,
    }
  },
})
</script>
