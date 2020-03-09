# projectZeta

Para iniciar o projeto tenha instalado:

* Docker
* Java 8+
* Gradle
* Node.js

####Passos para iniciar:

1. Inicie o banco de dados: docker-compose up mongo
1. Inicie o servidor de LDAP: docker-compose up ldap
1. Construa o projeto: gradle build

####Configuracao do OAUTH2

Utilize o cliente/senha:
* client/clientpassword
	
Utilize o endpoint: 
* POST http://localhost:8090/oauth/token?password=<SENHA_USUARIO>&grant_type=password&client_id=client&username=<NOME_USUARIO>


####URLS:

* [Swagger](http://localhost:8090/swagger-ui.html)
* [UI](http://localhost:4200)

####Utilitários

*npm install -g redis-commander -> Redis GUI

Para rodar redis-commander -p <PORTA>

*Docker UI Control
docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer