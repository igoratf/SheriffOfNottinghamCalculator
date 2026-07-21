FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=3002

RUN npm run build

EXPOSE 3002

CMD ["npm", "start"]
