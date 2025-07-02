# Usa Node.js 22 como imagen base
FROM node:22

# Establece el directorio de trabajo
WORKDIR /app

# Copia archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto
EXPOSE 8080

# Comando para correr la app
CMD ["npm", "start"]
