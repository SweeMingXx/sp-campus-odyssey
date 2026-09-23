FROM node:22-alpine
WORKDIR /app
COPY package.json server.mjs index.html style.css ./
COPY src ./src
USER node
EXPOSE 4173
ENV NODE_ENV=production
CMD ["node", "server.mjs"]
