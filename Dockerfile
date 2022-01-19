FROM node:16 AS build
WORKDIR /app
RUN yarn global add @ionic/cli
COPY package.json package-lock.json ./
RUN npm i
COPY . ./
RUN ionic build

FROM nginx:1.17.1-alpine as final
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
