FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# El script se ejecuta con "npm start"
CMD ["npm", "start"]
