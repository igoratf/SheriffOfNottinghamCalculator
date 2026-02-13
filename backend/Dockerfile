FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app code
COPY . .

EXPOSE 3002

CMD ["npm", "start"]
