FROM nginx

COPY dist/asign1/browser/. /usr/share/nginx/html

EXPOSE 80
