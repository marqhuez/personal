FROM php:8.3-apache

RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip

RUN a2enmod rewrite
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
COPY . .

RUN docker-php-ext-install pdo pdo_mysql && docker-php-ext-enable pdo_mysql

RUN composer install
RUN npm install
RUN npm run build

RUN cp .env.example .env
RUN chmod 777 -R storage
RUN php artisan key:generate

EXPOSE 80
