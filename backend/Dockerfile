FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
ENV PORT=3002

RUN npm run build

EXPOSE 3002

CMD ["npm", "start"]
