# Use a imagem base do Node.js
FROM node:20

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do aplicativo
COPY . .

# Construa o aplicativo React
RUN npm run build

# Exponha a porta 3000 (a porta em que o aplicativo React será executado)
EXPOSE 3000

# Comando para iniciar o aplicativo quando o contêiner for executado
CMD ["npm", "start"]
