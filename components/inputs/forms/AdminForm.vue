<template>
  <div>
    <v-form ref="formRef" class="mt-8" @submit="submit">
      <v-text-field
        v-model.trim="loginInput.email"
        :rules="emailRules"
        label="Email"
        prepend-icon="mdi-email"
        type="email"
        color="secondary"
      />
      <v-text-field
        v-model.trim="loginInput.password"
        :rules="passwordRules"
        label="Password"
        prepend-icon="mdi-key"
        :append-icon="passwordIsDisplayed ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordIsDisplayed ? 'text' : 'password'"
        color="secondary"
        @click:append="passwordIsDisplayed = !passwordIsDisplayed"
      />
    </v-form>
    <app-info-dialog :dialog-data="dialogData" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({})
</script>
