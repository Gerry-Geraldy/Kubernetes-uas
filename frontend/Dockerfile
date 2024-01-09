# Gunakan Node.js sebagai base image
FROM node:14-alpine

# Menentukan direktori kerja di dalam container
WORKDIR /usr/src/app

# Menyalin package.json dan package-lock.json (jika ada) ke dalam direktori kerja
COPY package*.json ./

# Install dependensi dari package.json
RUN npm install

# Menyalin file-file aplikasi ke dalam direktori kerja
COPY . .

# Menggunakan nginx sebagai server web
FROM nginx:alpine

COPY . /usr/share/nginx/html

# Expose port 80 (port default nginx)
EXPOSE 80

# Perintah untuk menjalankan nginx dalam container saat container dijalankan
CMD ["nginx", "-g", "daemon off;"]
