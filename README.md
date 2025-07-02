# CoderHouse.Backend3.ProyectoFinal

Proyecto final del curso de Programación Backend 3 de Coderhouse.

## 🐾 Adopt Me - Backend API

**Adopt Me** es una API RESTful desarrollada en Node.js con **MongoDB** como base de datos. Permite la gestión de usuarios, mascotas y adopciones. Incluye endpoints para registrar y autenticar usuarios, listar y gestionar mascotas, y realizar solicitudes de adopción.

## Características

- 🗃️ Base de datos MongoDB
- 🔐 Autenticación con JWT
- 🐶 Gestión de mascotas
- 👤 Gestión de usuarios
- 📦 Gestión de adopciones
- 🧪 Tests funcionales con cobertura completa de endpoints
- 📝 Documentación completa en Swagger/OpenAPI
- 🪵 Logging avanzado con Winston
- 🐳 Imagen Docker publicada en DockerHub

## Tecnologías utilizadas

- **Node.js** y **Express** para el backend
- **MongoDB** con Mongoose como base de datos NoSQL
- **JWT** para autenticación segura
- **Swagger (OpenAPI 3.0)** para documentación
- **Mocha**, **Chai**, y **Supertest** para testing
- **Winston** para logging
- **Docker** para contenerización y despliegue

## Logs

La aplicación utiliza Winston para generar logs estructurados con distintos niveles (info, warn, error). Los logs se almacenan tanto en consola como en archivos locales.

![alt text](/assets/image-1.png)

## Documentación de la API

Una vez ejecutada la aplicación, la documentación completa estará disponible en Swagger UI: 

http://localhost:8080/docs

![alt text](/assets/image.png)

## Tests

Los tests funcionales cubren todos los endpoints disponibles en la API, incluyendo:

- Autenticación (`/sessions`)
- Gestión de usuarios (`/users`)
- Gestión de mascotas (`/pets`)
- Gestión de adopciones (`/adoptions`)

![alt text](/assets/image-2.png)

Para ejecutar los tests:

```bash
npm run test
```

## Descarga y ejecución

### Local

Clona el repositorio desde github:

```bash
git clone https://github.com/RodolfoPeralta/CoderHouse.Backend3.Adoptme.git
```

Entra al directorio del proyecto:

```bash
cd CoderHouse.Backend3.Adoptme
```

Instala las dependencias:

```bash
npm install 
```

Crea un archivo .env con las variables de entorno necesarias:

```
# Port Server
PORT = 8080

# Node env (development or production)
NODE_ENV = development

# Mongo DB
MONGO = mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority&appName=<your-app-name>

# Json Web Token
PRIVATE_JWT_KEY = secret-key
```

Ejecuta la aplicación:

```bash
npm start
```

O en modo desarrollo (usa nodemon) con:

```bash
npm run dev
````

### Docker

La aplicación está disponible como imagen pública en DockerHub: 

https://hub.docker.com/r/rodolfoperalta/adoptme-server-rp

Copia y ejecuta los siguientes comandos:

```bash
docker pull rodolfoperalta/adoptme-server-rp:latest
```

```bash
docker run -p 8080:8080 rodolfoperalta/adoptme-server-rp:latest
```



