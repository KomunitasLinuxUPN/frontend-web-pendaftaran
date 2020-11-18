<template>
  <div>
    <v-form ref="formRef" class="mt-8">
      <v-text-field
        v-model.trim="adminInput.name"
        :rules="nonEmptyRules"
        label="Nama Lengkap"
        prepend-icon="mdi-account"
        type="text"
        color="secondary"
      />
      <v-text-field
        :value="adminInput.email"
        label="Email"
        prepend-icon="mdi-email"
        type="email"
        color="secondary"
        disabled
      />
      <v-text-field
        v-model.trim="adminInput.password"
        :rules="passwordRules"
        label="Password"
        prepend-icon="mdi-key"
        :append-icon="passwordIsDisplayed ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordIsDisplayed ? 'text' : 'password'"
        color="secondary"
        @click:append="passwordIsDisplayed = !passwordIsDisplayed"
      />
      <v-input class="mt-3" color="secondary">
        <v-file-input
          v-model="adminInput.photo"
          :rules="imageRules"
          :show-size="true"
          accept="image/png, image/jpg, image/jpeg"
          placeholder="Format png, jpg, jpeg"
          prepend-icon="mdi-camera"
          label="Foto Diri"
          class="mr-8"
        />
        <v-avatar size="100" class="secondary">
          <v-img position="center" :src="photoPreviewUrl" />
        </v-avatar>
      </v-input>
    </v-form>
    <div class="text-center">
      <v-btn :loading="btnIsLoading" rounded color="accent" @click="submit">
        {{ isEditing ? 'UPDATE' : 'REGISTER' }}
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'

import { Admin, AdminEditInput } from '@/models/Admin'
import { AUTH, ActionType as AuthActionType } from '@/store/auth'

interface VForm extends HTMLFormElement {
  reset(): void
  resetValidation(): void
  validate(): boolean
}

interface InputTextRules {
  (value: string | null): boolean | string
}

interface InputFileRules {
  (value: File | null): boolean | string
}

export default defineComponent({
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    admin: {
      type: Object as PropType<Admin>,
      required: true,
    },
  },
  emits: ['submit'],
  setup(props, context) {
    const nonEmptyRules: InputTextRules[] = [
      (text) =>
        (text && text.trim().length > 0) || 'Field ini tidak boleh kosong',
    ]

    const passwordRules: InputTextRules[] = [
      (text) =>
        (text && text.trim().length > 0) || 'Password tidak boleh kosong',
      (text) => (text && text.trim().length >= 6) || 'Password minimal 6 huruf',
    ]

    const imageRules: InputFileRules[] = [
      (file) => !!file || 'Harap sertakan foto diri anda',
      (file) =>
        (file && file.size < 1000000) || 'Ukuran foto harus kurang dari 1 MB',
      (file) => {
        if (
          file?.type === 'image/jpeg' ||
          file?.type === 'image/png' ||
          file?.type === 'image/jpg'
        ) {
          return true
        } else {
          return 'Format foto harus png, jpg, jpeg'
        }
      },
    ]

    const adminInput = reactive<AdminEditInput>({
      uid: props.admin.uid,
      name: props.admin.name,
      password: null,
      email: props.admin.email,
      photo: null,
    })

    const photoPreviewUrl = ref<string>(require(props.admin.photoURL!))

    watch(
      () => adminInput.photo,
      () => {
        photoPreviewUrl.value = adminInput.photo
          ? URL.createObjectURL(adminInput.photo)
          : require(props.admin.photoURL!)
      }
    )

    const { store } = useContext()
    const formRef = ref<VForm>()
    const passwordIsDisplayed = ref(false)
    const btnIsLoading = ref(false)

    function submit() {
      if (formRef.value?.validate()) {
        context.emit('submit', async () => {
          btnIsLoading.value = true

          if (props.isEdit) {
            await store.dispatch(
              `${AUTH}/${AuthActionType.UPDATE_CURRENT_ADMIN}`,
              adminInput
            )
          } else {
            // Insert new admin...
          }

          for (const key in adminInput) {
            adminInput[key] = null
          }
          formRef.value!.resetValidation()

          btnIsLoading.value = false
        })
      }
    }

    return {
      formRef,
      isEditing: props.isEdit,
      passwordIsDisplayed,
      adminInput,
      nonEmptyRules,
      passwordRules,
      imageRules,
      photoPreviewUrl,
      submit,
      btnIsLoading,
    }
  },
})
</script>
