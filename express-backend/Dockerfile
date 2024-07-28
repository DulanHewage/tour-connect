FROM node:18.13-alpine
ENV PORT 5000
WORKDIR /app
COPY . /app
RUN npm ci
RUN npm run build
COPY src/static/ /app/dist/src/static/
CMD ["node", "dist/src/server.js"]