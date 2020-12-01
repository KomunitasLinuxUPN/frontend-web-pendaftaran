# Frontend Web Pendaftaran KoLU

Aplikasi ini dibuat menggunakan framework Nuxt dengan mode SPA (Single Page Application)

Aplikasi ini memerlukan Backend dan dapat dilihat di repository [Backend-Web-Pendaftaran-KoLU](https://github.com/KomunitasLinuxUPN/Backend-Web-Pendaftaran-KoLU.git)

---

## Untuk Para Kontributor dan _Maintainer_

#### Tentang Ekstensi

- Dianjurkan untuk memasang ekstensi ESLint untuk pengguna VSCode, karena proyek ini memiliki _hook pre-commit_ yang menjalankan ESLint untuk menjaga kualitas dan konsistensi kode.

#### Tentang _commit_

- Dimohon untuk tidak melakukan _commit_ langsung ke _branch master_. Dimohon untuk membuat _branch_ baru untuk setiap pekerjaan anda, lalu _push_ branch tersebut ke _repository_ ini dan lakukan _pull request_ ke _branch master_.

---

## Panduan _Setup_ Lokal

```bash
# Isikan kredensial Firebase anda ke dalam file .env
# Isikan domain dari backend-nya ke dalam file .env (untuk pengiriman email konfirmasi pendaftaran)
# Silahkan buat file .env tersebut berdasarkan file .example.env

# install dependencies
$ npm install

# Jalankan web server di mode development dengan hot reload. Dapat diakses di localhost:3000
$ npm run dev

# Build projek & jalankan projek di mode production
$ npm run build
$ npm run start

# Setup Firebase & Deploy ke firebase
$ firebase login
$ firebase init
$ firebase deploy
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

---

> Sebagian isi README ini mengutip dari README [web-pendaftaran-seed](https://github.com/pps-ti/web-pendaftaran-seed) milik Lab PPS-TI UPN "Veteran" Jawa Timur

