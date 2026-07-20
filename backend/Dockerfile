FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the prisma folder explicitly to the WORKDIR
COPY prisma ./prisma/

# Copy prisma config
COPY prisma.config.ts ./

# Copy the rest of your app code
COPY . .

# Compile TypeScript to JavaScript (without calling prisma generate)
RUN npx tsc

EXPOSE 3002

CMD ["npm", "start"]

