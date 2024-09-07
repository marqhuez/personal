FROM php:8.3

RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .

RUN docker-php-ext-install pdo pdo_mysql && docker-php-ext-enable pdo_mysql

RUN composer install

EXPOSE 8000
