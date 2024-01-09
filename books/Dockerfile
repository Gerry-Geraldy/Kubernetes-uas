# Menggunakan Node.js image sebagai base
FROM node:14

# Menentukan direktori kerja di dalam container
WORKDIR /usr/src/app

# Menyalin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Menginstal dependensi npm
RUN npm install

# Menyalin seluruh kode aplikasi ke dalam container
COPY . .

# Menyalin file book.js ke dalam direktori /usr/src/app
COPY book.js /usr/src/app/book.js

# Menjalankan perintah untuk menjalankan MongoDB pada port default 27017 (atau port lain yang Anda gunakan)
EXPOSE 4545

# Perintah untuk menjalankan aplikasi
CMD ["node", "books.js"]
