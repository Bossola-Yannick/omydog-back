FROM alpine:3.19
WORKDIR /app
RUN apk add --no-cache nodejs npm
COPY package*.json /app/
RUN npm install
COPY . /app
EXPOSE 5000
CMD ["./wait-for-it.sh", "database:5432", "--", "node", "index.js"]

