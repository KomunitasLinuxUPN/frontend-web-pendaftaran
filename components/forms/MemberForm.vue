<template>
  <div>
    <v-form ref="formRef" class="mt-4">
      <v-text-field
        v-model.trim="memberInput.name"
        :rules="nonEmptyRules"
        label="Nama Lengkap"
        prepend-icon="mdi-account"
        type="text"
        color="primary"
      />
      <v-text-field
        v-model.trim="memberInput.address"
        :rules="nonEmptyRules"
        label="Alamat Lengkap"
        prepend-icon="mdi-home"
        type="text"
        color="primary"
      />
      <v-text-field
        v-model.number="memberInput.generation"
        :rules="angkatanRules"
        label="Angkatan"
        prepend-icon="mdi-calendar-account"
        type="number"
        hint="Range angkatan 2003 - 2020"
        color="primary"
      />
      <v-text-field
        v-model.trim="memberInput.department"
        :rules="nonEmptyRules"
        label="Jurusan"
        prepend-icon="mdi-school"
        type="text"
        color="primary"
      />
      <v-text-field
        v-model.trim="memberInput.email"
        :rules="emailRules"
        label="Email"
        prepend-icon="mdi-email"
        type="email"
        color="primary"
      />
      <v-text-field
        v-model.trim="memberInput.phone"
        :rules="nonEmptyRules"
        label="Nomor Telefon"
        prepend-icon="mdi-phone"
        type="text"
        color="primary"
      />
      <v-text-field
        v-model.trim="memberInput.lineID"
        :rules="nonEmptyRules"
        label="ID LINE"
        hint="Hanya ID tanpa '@' seperti 'cah_ganteng_123'"
        prepend-icon="mdi-at"
        type="text"
        color="primary"
      />
      <v-input class="mt-3">
        <v-file-input
          v-model="memberInput.photo"
          :rules="imageRules"
          accept="image/png, image/jpg, image/jpeg"
          placeholder="Format png, jpg, jpeg"
          prepend-icon="mdi-camera"
          label="Foto Diri"
          class="mr-8"
        />
        <v-avatar size="100" class="info">
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

import { MemberInput } from '@/models/NewMember'
import { MEMBERS, ActionType as MembersActionType } from '@/store/members'

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
  emits: ['submit'],
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    member: {
      type: Object as PropType<MemberInput>,
      required: true,
    },
  },
  setup(props, context) {
    const nonEmptyRules: InputTextRules[] = [
      (text) =>
        (text && text.trim().length > 0) || 'Field ini tidak boleh kosong',
    ]

    const angkatanRules: InputTextRules[] = [
      (tahun) => !!tahun || 'Field ini tidak boleh kosong',
      (tahun) =>
        (tahun && +tahun >= 2003 && +tahun < 2021) ||
        'Range angkatan antara 2003 - 2020',
    ]

    const emailRules: InputTextRules[] = [
      (email) =>
        (email && email.trim().length > 0) || 'Email tidak boleh kosong',
      (email) =>
        (email && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) ||
        'Email tidak valid',
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

    const { app } = useContext()
    const formRef = ref<VForm>()
    const btnIsLoading = ref(false)

    const memberInput = reactive<MemberInput>({ ...props.member })
    const photoPreviewUrl = ref<string>(
      require('@/assets/images/default-avatar.png')
    )

    watch(
      () => memberInput.photo,
      () => {
        photoPreviewUrl.value = memberInput.photo
          ? URL.createObjectURL(memberInput.photo)
          : require('@/assets/images/default-avatar.png')
      }
    )

    function submit() {
      if (formRef.value?.validate()) {
        context.emit('submit', async () => {
          try {
            btnIsLoading.value = true

            if (props.isEdit) {
              // Update member...
            } else {
              await app.store?.dispatch(
                `${MEMBERS}/${MembersActionType.REGISTER_MEMBER}`,
                memberInput
              )
            }

            for (const key in memberInput) {
              memberInput[key] = null
            }
            formRef.value!.resetValidation()
          } finally {
            btnIsLoading.value = false
          }
        })
      }
    }

    return {
      formRef,
      nonEmptyRules,
      angkatanRules,
      emailRules,
      imageRules,
      memberInput,
      photoPreviewUrl,
      submit,
      isEditing: props.isEdit,
      btnIsLoading,
    }
  },
})
</script>
