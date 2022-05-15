# BUILDING ROUTINE
FROM node:14-alpine AS builder
ENV NODE_ENV production
WORKDIR /app
COPY ./package*.json .
RUN npm install --production
COPY . .
RUN npm run build

# SERVER PRODUCTION ROUTINE
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
COPY --from=builder /app/build /usr/share/nginx/html/welison-menezes-covid-tracker
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8888
CMD ["nginx", "-g", "daemon off;"]
