![MOODLY LOGO](./docu/logo.gif)

## CONTENIDO
* [DESPLIEGUE EN LOCAL](#despliegue-en-local)
* [ACCESO EN LOCAL](#acceso-en-local)
* [TECNOLOGÍAS](#tecnologías)
* [DETALLES TÉCNICOS](#detalles-técnicos-y-notas-del-proyecto)
* [ACCESO A PRODUCCIÓN](#acceso-a-producción)
* [NEXT STEPS](#next-steps)
* [COLABORADORES](#colaboradores)

## DESPLIEGUE EN LOCAL

Clonamos el repositorio en local, introduciendo en la terminal en el caso de Linux:
```git clone git@github.com:alexBasurto/tripulaciones_back.git```

... o en el caso de Windows:
```git clone https://github.com/alexBasurto/tripulaciones_back.git```

Creamos el fichero .env del back (/.env) tomando /.env.example como ejemplo.

Desde la carpeta del proyecto ejecutamos los siguientes comandos para poner en marcha el back:
```docker compose up --build```

Creamos el fichero .env del front (/client/.env) tomando '/client/.env.example' como ejemplo.

En la terminal nos posicionamos en la carpeta del front:
```cd client```

Instalamos las dependencias:
```npm install```

Ponemos en marcha el front:
```npm run dev```


## ACCESO EN LOCAL



Usuarios estándar:

A15251 : Adm1234567
A15252 : Adm1234567
A15253 : Adm1234567

login usuario estándar: http://localhost:5173/

Usuarios panel RRHH:

A15248 : Adm1234567
A15249 : Adm1234567

Login RRHH: http://localhost:5173/admin

## TECNOLOGÍAS

## DETALLES TÉCNICOS Y NOTAS DEL PROYECTO
Acceda aquí:
[DETALLES Y NOTAS](./docu/DETALLES.md)

## ACCESO A PRODUCCIÓN

## NEXT STEPS

## COLABORADORES
