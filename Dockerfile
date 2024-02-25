FROM node:20
WORKDIR /app
COPY dist ./dist/
COPY *.json ./
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]