# tripulaciones_back
# puesta en marcha del proyecto

Clonamos el repositorio en local:
```git clone git@github.com:alexBasurto/tripulaciones_back.git```

Creamos el fichero .env del back (/.env) tomando .env.example como ejemplo.

Desde la carpeta del proyecto ejecutamos los siguientes comandos para poner en marcha el back:
```docker compose up --build```

En la terminal nos posicionamos en la carpeta del front:
```cd client```

Instalamos las dependencias:
```npm install```

Ponemos en marcha el front:
```npm run dev```