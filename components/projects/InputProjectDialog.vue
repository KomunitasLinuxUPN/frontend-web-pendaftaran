<template>
  <v-dialog eager max-width="600px">
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
                v-model="formattedDate"
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
        <v-btn text class="accent ma-4" @click="submit">Add Project</v-btn>
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
} from '@nuxtjs/composition-api'

import { InputProject } from '@/models/Project'

interface VForm extends HTMLFormElement {
  reset(): void
  resetValidation(): void
  validate(): boolean
}

export default defineComponent({
  setup() {
    const formRef = ref<VForm>()
    const inputRules = [
      (val: string) => val.length > 0 || 'This input field must not be empty',
    ]
    const inputProject = reactive<InputProject>({
      title: '',
      content: '',
      due: new Date().toISOString().substr(0, 10),
    })

    const formattedDate = computed(() => {
      return new Date(inputProject.due).toUTCString().substr(0, 16)
    })

    function submit() {
      if (formRef.value?.validate()) {
        // eslint-disable-next-line no-console
        console.log(inputProject)
      }
    }

    return {
      formRef,
      inputRules,
      inputProject,
      formattedDate,
      submit,
    }
  },
})
</script>
