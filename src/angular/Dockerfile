# Etape de construction
#FROM node:lts as build

#WORKDIR /app

#COPY package*.json ./

#RUN npm install

#COPY . .

#RUN npm run build --prod

# Etape de mise en production
#FROM nginx:stable

#COPY default.conf /etc/nginx/conf.d/

#COPY --from=build /app/dist/angular /usr/share/nginx/html

#EXPOSE 8081

#CMD ["nginx", "-g", "daemon off;"]
# Etape de construction
FROM node:lts as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "start", "--", "--host", "0.0.0.0"]

#CMD ["npm", "start"]

