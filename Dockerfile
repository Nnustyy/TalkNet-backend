# FROM node:18-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm install -g prisma
# RUN prisma generate
# COPY prisma/schema.prisma ./prisma/
# EXPOSE 3000
# CMD ["npm", "start"]

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g prisma

RUN prisma generate

COPY prisma/schema.prisma ./prisma/

EXPOSE 3000

CMD [ "npm", "start" ]