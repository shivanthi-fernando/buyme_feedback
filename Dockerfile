FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4006
ENTRYPOINT ["node", "index.js"]