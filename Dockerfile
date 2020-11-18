#Image de node supportée
FROM node:10.16.3-alpine



ENV NODE_ENV="production"

COPY package.json app.js .env server.js /app/
COPY api /app/api/
COPY config /app/config/
COPY models /app/models/

WORKDIR /app
RUN npm cache clean --force && \
    npm install --silent --progress=false --production


EXPOSE 3000

CMD ["npm", "start"]
