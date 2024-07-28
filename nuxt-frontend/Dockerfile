FROM node:20-alpine
WORKDIR /app
COPY . /app
ENV DOCKER=true
RUN npm ci
RUN npm run build
CMD ["node", ".output/server/index.mjs"]