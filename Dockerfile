# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /CRUD
COPY . .
RUN yarn install --production

CMD ["node","src/main/index.js"]
EXPOSE 3000
