# Puesta en marcha del proyecto

Este proyecto está dividido en dos partes principales: el **backend** y el **frontend**, cada uno ubicado en su respectiva carpeta. A continuación, se detallan los pasos necesarios para poner en marcha cada componente y cómo está estructurado el proyecto.

## Estructura del proyecto

El proyecto está organizado de la siguiente manera:

```
/proyecto
│
├── backend/
│   ├── api/
│   │   └── swagger/ (archivo de especificación Swagger)
│   ├── auth
│   ├── controllers/
│   ├── service/
│   ├── utils/
│   └── index.js (archivo de inicio del servidor)
│
└── frontend/
    ├── src/
    │   ├── app/ (componentes de la aplicación)
    │   │    └── service/
    │   ├── assets/
    │   └── environments/
    └── ionic.config.json
```

### Backend

La carpeta `backend` contiene toda la lógica relacionada con la base de datos y la API. Dentro de la subcarpeta `api` se encuentra el archivo de especificación de Swagger, que documenta los endpoints de la API.

**Pasos para la puesta en marcha del backend:**
1. Navega a la carpeta `backend` en la terminal.
2. Ejecuta `npm install` para instalar todas las dependencias necesarias.
3. Asegúrate de tener encendido **XAMPP** con el servicio **MySQL** activo.
4. Inicia el servidor con uno de los siguientes comandos:
   - `nodemon index.js`
   - `node index.js`

**Nota:** La consola te indicará en qué puerto se está ejecutando el servidor.

### Frontend

La carpeta `frontend` contiene el proyecto de **Ionic** con todos los componentes y servicios de la aplicación.

**Pasos para la puesta en marcha del frontend:**
1. Navega a la carpeta `frontend` en la terminal.
2. Ejecuta `npm install` para instalar las dependencias.
3. Inicia la aplicación con uno de los siguientes comandos:
   - `ionic serve`
   - `ng serve`

**Nota:** La consola mostrará en qué puerto se está ejecutando la aplicación frontend.

### Puesta en marcha completa

Para ejecutar el proyecto completo, asegúrate de seguir estos pasos:
1. Enciende **XAMPP** con **MySQL** activo.
2. Abre una terminal y navega a la carpeta `backend`, luego ejecuta `npm install` y `nodemon index.js`.
3. Abre otra terminal, navega a la carpeta `frontend`, y ejecuta `npm install` seguido de `ionic serve`.
4. Verifica los puertos que se muestran en la consola para acceder al backend y al frontend.