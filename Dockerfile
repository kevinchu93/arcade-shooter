FROM node

WORKDIR /opt/arcade-shooter

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]
