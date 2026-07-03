FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --legacy-peer-deps --no-audit --no-fund
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
