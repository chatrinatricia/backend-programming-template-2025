# Backend Programming Template (2025)

quiz Back End Programming

Nama: Chatrina Citra Patricia Hutabarat

NIM: 535250096

Kelas: B

penjelasan endpoint yang ada di gacha:

1. POST /gacha/roll
   fungsi: melakukan roll gacha
   Kirim request POST ke endpoint /gacha/roll dengan mengirimkan userId di body request (format JSON).

Aturan main:

- user maksimal 5x undian per hari.
- Peluang menang 50%
- Hadiah terbatas (kalau kuota habis, hadiah tidak bisa didapat lagi).
- Kalau sudah 5x, akan ditolak sampai besok.

Response Sukses
<img width="1918" height="1023" alt="berhasil 1" src="https://github.com/user-attachments/assets/ed28e5a1-17b7-4ecf-ba14-a968af2b838e" />

Response Zonk
<img width="1918" height="1021" alt="berhasil 4" src="https://github.com/user-attachments/assets/78388a55-af98-46e3-bba5-24aa1290cef3" />

Response sudah melibihi limit
<img width="1918" height="1025" alt="berhasil soldout " src="https://github.com/user-attachments/assets/21e31233-041b-4bcd-87f7-d087f98956e6" />


2. GET /gacha/history/:userId
   fungsi: melihat riwayat gacha user yang ingin dilihat pembuat gacha.
   Kirim request GET ke endpoint /gacha/history/:userId
   Ganti {userId} dengan ID user yang mau dicek, hasilnya akan muncul list semua undian user tersebut, termasuk menang/kalah, dapat hadiah apa, dan jam berapa.

   Hasil dari melihat history
   <img width="1918" height="1021" alt="berhasil histori" src="https://github.com/user-attachments/assets/6e036bd7-d5d9-4c3f-84b6-606a3a835190" />


3. GET /gacha/prizes
   fungsi: Melihat status ketersediaan hadiah (kuota dan sisa)
   Kirim request GET ke endpoint /gacha/prizes.
   Tidak perlu kirim data apapun.
   Hasilnya: Akan muncul informasi seperti:

- Emas 10 gram: total 1, sisa 0 (sudah habis)
- Smartphone X: total 5, sisa 2
- Voucher Rp100.000: total 100, sisa 55

hasil dari melihat status ketersediaan hadiah
<img width="1918" height="1023" alt="berhasil prizes" src="https://github.com/user-attachments/assets/157be872-27fa-4df9-8ff0-b49428b92cfb" />


4. GET /gacha/winners
   fungsi: Melihat siapa saja yang berhasil memenangkan hadiah (khusus yang menang, zonk tidak ditampilkan).
   Kirim request GET ke endpoint /gacha/winners
   Nama pemenang diproteksi (dimasking) jadi tidak terlihat utuh, misal b***i untuk budi.

   Hasil dari winners
   <img width="1917" height="1023" alt="berhasil winners" src="https://github.com/user-attachments/assets/18d6d4b0-0162-4641-b1c2-3d9963648a41" />


## Development Setup

1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint` and `Prettier`.
4. Copy and rename `.env.example` to `.env`. Open `.env` and change the database connection string.
5. Run `npm install` to install the project dependencies.
6. Run `npm run dev` to start the dev server.
7. Test the endpoints in the API client app.

## Add New API Endpoints

1. Create a new database schema in `./src/models`.
2. Create a new folder in `./src/api/components` (if needed). Remember to separate your codes to repositories, services, controllers, and routes.
3. Add the new route in `./src/api/routes.js`.
4. Test your new endpoints in the API client app.
