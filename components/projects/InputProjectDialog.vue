<template>
  <v-dialog v-model="dialogIsOpen" eager max-width="600px">
    <template #activator="{ on, attrs }">
      <v-btn text class="accent mb-4" v-bind="attrs" v-on="on">
        Add New Project
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <h2 class="title">Add a New Project</h2>
      </v-card-title>
      <v-card-text>
        <v-form ref="formRef" class="px-3">
          <v-text-field
            v-model="inputProject.title"
            label="Title"
            prepend-icon="mdi-folder"
            :rules="inputRules"
          />
          <v-textarea
            v-model="inputProject.content"
            label="Content"
            prepend-icon="mdi-pencil"
            :rules="inputRules"
          />
          <v-menu>
            <template #activator="{ on, attrs }">
              <v-text-field
                :value="formattedDate"
                v-bind="attrs"
                label="Due date"
                readonly
                prepend-icon="mdi-calendar-range"
                v-on="on"
              />
            </template>
            <v-date-picker v-model="inputProject.due" />
          </v-menu>
        </v-form>
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

import { InputProject } from '@/models/Project'
import {
  projectsStore,
  ActionType as ProjectsActionType,
} from '@/store/projects'

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
    const { store, error } = useContext()

    async function submit() {
      if (formRef.value?.validate()) {
        try {
          isLoading.value = true

          await store.dispatch(
            `${projectsStore}/${ProjectsActionType.ADD_PROJECT}`,
            inputProject
          )

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
