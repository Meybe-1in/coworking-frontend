# Coworking App Frontend

## Levantar proyecto con Docker
```bash
git clone https://github.com/Meybe-1in/coworking-frontend.git
docker-compose up --build
```

## Crear variables de entorno

El frontend consume la API desde `http://backend:8080/api` gracias a la red interna de Docker.
Puede cambiarse mediante variables de entorno (`VITE_API_URL`).

## Endpoints principales

- POST /auth/login
- POST /auth/register
- GET /users (protegido con JWT)

## Configuración de variables de entorno

Antes de levantar los servicios con Docker, sigue el archivo de ejemplo en coworking-infra:

```bash
.env.example 
```