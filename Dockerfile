FROM nginx:alpine AS builder
COPY frontend /usr/share/nginx/html

FROM nginx:alpine
COPY --from=builder /usr/share/nginx/html /usr/share/nginx/html

