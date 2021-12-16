# Latest Long Term Support node
FROM node:16

# Create app directory
WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm i

# Bundle app source
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]