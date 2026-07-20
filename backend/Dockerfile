FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the prisma folder explicitly to the WORKDIR
COPY prisma ./prisma/

# Copy the rest of your app code
COPY . .

RUN npm run build

EXPOSE 3002

CMD ["npm", "start"]
