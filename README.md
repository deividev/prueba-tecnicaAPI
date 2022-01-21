Instalamos las librerías necesarias:

```bash
npm install or yarn install
```

Instalamos contenedores en modo desarrollo:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

Esto nos creará 2 contenedores:

- Base de datos mongoDB
- Visor de Base de datos (localhost:8081)

Iniciar back-app en modo desarrollo:

```bash
npm run dev or yarn run dev
```

Se adjunta en el repositorio un json de documentación de la api que podrá importar a postman:

```bash
ApiDoc.postmancollection.json
```

Aquí tendrá toda la información de los diferentes endpoints.