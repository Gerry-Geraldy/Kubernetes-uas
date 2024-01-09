# Menggunakan Node.js image sebagai base
FROM node:14

# Menentukan direktori kerja di dalam container
WORKDIR /app/orders

# Menyalin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Menginstal dependensi npm
RUN npm install

# Menyalin seluruh aplikasi ke dalam container
COPY . .

# Menjalankan server pada port yang ditentukan
EXPOSE 7777

# Perintah untuk menjalankan aplikasi
CMD ["node", "orders.js"]
