<template>
  <v-container class="confirmation fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <div class="text-center">
          <div v-if="isVerifSuccess === true">
            <h1 class="display-1">Konfirmasi Pendaftaran BERHASIL! 🥳</h1>
            <p class="subtitle-1 mt-5">{{ caption }}</p>
          </div>
          <div v-else-if="isVerifSuccess === false">
            <h1 class="display-1">Konfirmasi pendaftaran GAGAL! &#128533;</h1>
            <p class="subtitle-1 mt-5">{{ caption }}</p>
          </div>
          <div v-else>
            <v-progress-circular
              :size="70"
              :width="7"
              color="primary"
              indeterminate
            />
          </div>
          <v-btn class="mt-10" outlined to="/" color="primary">
            KEMBALI KE HALAMAN UTAMA
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useAsync,
  useContext,
} from '@nuxtjs/composition-api'

/*
 * Halaman Konfirmasi Registrasi
 *
 * Halaman ini berisi:
 * 1. Tampilan info konfirmasi pendaftaran
 * 2. Logic untuk melakukan konfirmasi pendaftaran
 *
 * Halaman ini sebaiknya hanya bisa diakses oleh pengguna
 * yang menekan tombol konfirmasi di email
 */
export default defineComponent({
  layout: 'verification',
  setup() {
    const { app, query } = useContext()

    const caption = ref<string | null>(null)
    const token = query.value.token

    const isVerifSuccess = useAsync(async () => {
      try {
        const memberSnapshots = await app.$fire.firestore
          .collection('members')
          .where('verification.token', '==', token)
          .where('verification.isVerified', '!=', true)
          .get()

        if (memberSnapshots.empty) {
          caption.value =
            'Mungkin pendaftaranmu sudah terkonfirmasi atau tokenmu tidak valid'
          return false
        }

        const memberDocRef = memberSnapshots.docs[0].ref
        await memberDocRef.update({
          'verification.isVerified': true,
          'verification.token': '',
        })

        caption.value = 'Selamat! Kamu terdaftar sebagai anggota KoLU'
        return true
      } catch (err) {
        caption.value =
          'Mohon maaf, terjadi kesalahan pada sistem, coba lagi nanti atau silahkan hubungi admin'
        return false
      }
    })

    return {
      isVerifSuccess,
      caption,
    }
  },
  head: {
    title: 'Konfirmasi Pendaftaran',
  },
})
</script>
