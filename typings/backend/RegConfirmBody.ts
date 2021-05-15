/*
 * RegConfirmBody adalah struktur request body yang akan dikirim oleh frontend
 * ke backend ketika user melakukan pendaftaran (untuk mengirim email konfirmasi)
 *
 * Struktur RegConfirmBody disini HARUS MIRIP dengan
 * struktur RegConfirmBody yang ada di projek backend
 */
export default interface RegConfirmBody {
  destEmail: string
  confirmationURL: string
}
