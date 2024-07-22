# Используем образ Node.js
FROM node:22.5.1-alpine as build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем все остальные файлы в контейнер
COPY . .

# Сборка приложения
RUN npm run build

# Используем образ nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Указываем порт, который будет использоваться приложением
EXPOSE 80

# Команда для запуска приложения
CMD ["nginx", "-g", "daemon off;"]