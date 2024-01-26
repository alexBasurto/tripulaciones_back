# Configuración inicial VPS

Pasos a seguir. Preparación de nuestro VPS:

## Conexión al servidor y claves ssh

1. Conseguimos la dirección IP de nuestro servidor y nos conectamos mediante ssh
``` bash
ssh <usuario>@<host>
``` 
2. abrimos una sesión nueva de terminal en nuestro PC y creamos la clave ssh mediante el siguiénte código:
``` bash
ssh-keygen -t ed25519 -C "<comentario>"
``` 
3.  Añadimos la clave a nuestro agente ssh mediante el siguiente código:
``` bash
eval "$(ssh-agent -s)"

ssh-add ~/.ssh/<clave_ssh>
```

  * Si el código anterior no funciona de forma permanente, podemos crear el archivo **~/.ssh/config** con el siguiente contenido:
``` bash
Host <host>
	IdentityFile ~/.ssh/<clave_ssh>

```
4. Añadimos esa clave a la lista de claves conocidas del servidor mediante el siguiente código:
``` bash
ssh-copy-id -i ~/.ssh/<clave_ssh>.pub <user>@<host>
```
5. Si queremos, podemos añadir una clave ssh en el servidor para acceder a [**GitHub**](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent). Los pasos a seguir son:
    - pasos 2 y 3 del apartado anterior
    - copiamos la clave pública en el portapapeles, la podemos mostrar por pantalla y copiarla
    ``` bash
    cat ~/.ssh/<clave_ssh>.pub
    ```
    - añadimos la clave a nuestra [cuenta de GitHub](https://github.com/settings/keys)
    - comprobamos que todo funciona correctamente mediante el siguiente código:
    ``` bash
    ssh -T git@github.com
    ```

## Instalación de Docker en VPS

 1. actualizamos el servidor con los siguientes comandos
```bash

sudo apt update  
sudo apt upgrade  

```
2. seguimos los pasos que encontramos en la [página oficial](https://docs.docker.com/engine/install/ubuntu/)


```bash
# Update the apt package index and install packages to allow apt to use a repository over HTTPS:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg

# Add Docker’s official GPG key:
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg


# Use the following command to set up the repository:
echo \
    "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
    "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update the apt package index:
sudo apt-get update

# Install Docker Engine, containerd, and Docker Compose.
# To install the latest version, run:
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

3. Añadimos nuestro usuario al grupo de docker para poder ejecutar comandos sin sudo

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
```

# Puesta en marcha de un proyecto
## NGINX reverse proxy y Letsencrypt SSL

### Puesta en marcha

Seguimos los pasos de [la siguiente página](https://web.vnappmob.com/page/hosting-multiple-sites-or-applications-using-docker-and-nginx-reverse-proxy-with-letsencrypt-ssl-139)  

1. Creamos un repositorio en github vacío y añadimos el archivo docker-compose.yml al repositorio.
Este docker compose sirve para crear un contenedor docker con nginx-proxy para publicar páginas web a Internet. Una vez creado, se puede mantener aunque cambiemos de proyecto. 

``` yaml
version: '3'

services:
  nginx-proxy:
    image: jwilder/nginx-proxy
    container_name: nginx-proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - conf:/etc/nginx/conf.d
      - vhost:/etc/nginx/vhost.d
      - dhparam:/etc/nginx/dhparam
      - certs:/etc/nginx/certs:ro
      - html:/usr/share/nginx/html
      - /var/run/docker.sock:/tmp/docker.sock:ro
    networks:
      - proxy
    restart: always

  letsencrypt:
    image: jrcs/letsencrypt-nginx-proxy-companion
    container_name: nginx-proxy-le
    volumes_from:
      - nginx-proxy
    volumes:
      - certs:/etc/nginx/certs:rw
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - acme:/etc/acme.sh
      - html:/usr/share/nginx/html
    restart: always

volumes:
  conf:
  vhost:
  dhparam:
  certs:
  acme:
  html:

networks:
  proxy:
    name: nginx-proxy
    external: true
```

2. Descargamos el repositorio en el servidor
(Podemos saltarnos el paso 1 y 2 y cargar directamente el docker-compose en el VPS y ponerlo en marcha).

3. Creamos la red *nginx-proxy* en el servidor

```bash
docker network create nginx-proxy
```

4. Ponemos en marcha los contenedores
```bash
docker compose up -d
```

5. A partir de aquí, vamos a poner en marcha este proyecto en cuestión (MOODLY).

6. En el proyecto, durante el desarrollo, hemos contado con estás líneas en package.json:

```json
"scripts": {
    "start": "nodemon src/index.js",
```

... que deben ser cambiadas por estas:

```json
"scripts": {
    "start": "node src/index.js",
```
De esta forma cambiamos el entorno de ejecución de Nodemon a NodeJS.

Por otro lado, en el docker-compose de desarrollo contabamos con las siguientes líneas:
```yaml
version: '3'

services:
  db:
    image: mysql:8.0
    container_name: mysql_tripulaciones
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
    ports:
      - ${MYSQL_LOCAL_PORT}:${MYSQL_PORT}
    volumes:
      - ./db/data:/var/lib/mysql
      - ./db/init:/docker-entrypoint-initdb.d
    env_file:
      - .env
      
  node:
    build: .
    container_name: node_tripulaciones
    ports:
      - ${APP_LOCAL_PORT}:${APP_PORT}
    depends_on:
      - db
    volumes:
      - .:/app
      - /app/node_modules
```

...las cuales deben ser cambiadas por esto:
```yaml
version: '3'

services:
  db:
    image: mysql:8.0
    container_name: mysql_tripulaciones
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
      MYSQL_DATABASE: ${MYSQL_DATABASE}
    volumes:
      - ./db/data:/var/lib/mysql
      - ./db/init:/docker-entrypoint-initdb.d
    env_file:
      - .env
    networks:
      - moodly_api
    restart: always
      
  node:
    build: .
    container_name: node_tripulaciones
    ports:
      - ${APP_LOCAL_PORT}:${APP_PORT}
    depends_on:
      - db
    volumes:
      - .:/app
      - /app/node_modules
    networks:
      - moodly_api
      - proxy
    environment:
      - VIRTUAL_HOST=moodlyapi.basurto.dev
      - LETSENCRYPT_HOST=moodlyapi.basurto.dev
      - LETSENCRYPT_EMAIL=admin@basurto.dev
    restart: always

  nginx:
    image: nginx:latest
    expose:
      - "80"
    environment:
      - VIRTUAL_HOST=moodly.basurto.dev
      - LETSENCRYPT_HOST=moodly.basurto.dev
      - LETSENCRYPT_EMAIL=admin@basurto.dev
    volumes:
      - ./dist:/usr/share/nginx/html:ro
      ##En caso de que tenga rutass variables o se quiera configurar nginx##
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
    networks:
      - proxy
    restart: always

networks:
   proxy:
      name: nginx-proxy
      external: true
   moodly_api:
      name: moodly_api
```
#### archivo nginx.conf
Creamos el archivo en una nueva carpeta (nginx) en nuestro repositorio local
  ```nginx
  server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html =404;
    }
}
  ```

Arrancamos los contenedores docker.
```bash
docker compose up --build
```



##### ¿Qué hemos añadido y qué cosas han cambiado?
- Servicio db:
    - ports quitado
    - networks:
        - moodly_api
    - restart: always (Importante, es entorno de producción)
- Servicio node:
    - networks:
      - moodly_api
      - proxy
    - environment:
      - VIRTUAL_HOST=moodlyapi.basurto.dev
      - LETSENCRYPT_HOST=moodlyapi.basurto.dev
      - LETSENCRYPT_EMAIL=admin@basurto.dev
    - restart: always
- Servicio nginx: entero
- Networks: entero

##### ¿Qué hace cada contenedor de docker en el VPS?
###### node_tripulaciones:
Descripción: Este contenedor ejecuta una aplicación Node.js ad hoc. El contenedor está configurado para que el puerto 3000 de la aplicación dentro del contenedor esté mapeado al puerto 3020 de tu VPS, permitiendo el acceso a la aplicación desde fuera del contenedor.

###### mysql_tripulaciones:
Descripción: Este contenedor está ejecutando una base de datos MySQL la cual es gestionada por la aplicación Node.js. No tiene puertos mapeados para acceso externo, ya que sólo es accesible desde otros contenedores en tu VPS: la aplicación Node.js.

###### tripulaciones_back-nginx:
Descripción: Este contenedor está ejecutando un servidor web Nginx, pero no tiene puertos mapeados para acceso externo.

###### nginx-proxy-le
Descripción: Este contenedor trabaja en conjunto con el contenedor nginx-proxy. Se encarga de automatizar la obtención y renovación de certificados SSL/TLS de Let's Encrypt para los sitios que se ejecutan en tu VPS y que están siendo manejados por el nginx-proxy.

###### nginx-proxy:
Descripción: Este contenedor actúa como un proxy inverso automatizado que utiliza Nginx. Lo que hace es dirigir el tráfico entrante a otros contenedores basándose en el nombre de dominio o subdominio solicitado. Está configurado para escuchar en los puertos 80 y 443 de tu VPS, manejando así el tráfico HTTP y HTTPS




###### Documentación pendiente de revisión


