# Open Jira App
For running locally you need a database
```
docker-compose up -d
```
* -d means __detached__

* MongoDB local url: 
```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

## Llenar la base de datos con informacion de prueba
Llamar a:
``` 
  localhost:3000/api/seed
```
