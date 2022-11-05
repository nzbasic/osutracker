FROM node:14
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
RUN cd client && npm install
RUN cd client && npm run build
EXPOSE 8080
CMD ["npm", "run", "start"]