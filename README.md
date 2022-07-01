# projectZeta

Para iniciar o projeto tenha instalado:

* Docker
* Java 8+
* Gradle
* Node.js

#### Passos para iniciar:

1. Inicie os containers: 
```sh
docker-compose up -d mongo db zookeeper ldap keycloak redis kafka
```
> **_Importante:_**  o container do kafka depende do serviço do zookeeper para funcionar, e algumas vezes o kafka não vai reconhecer a tempo o zookeeper. Apenas tente inicializar novamente.

2. Execute o plugin flyway para iniciar sua base de dados:
 
```sh
./gradlew flyway:baseline flyway:migrate
```

3. Construa o projeto:

```sh
./gradlew clean build
```
#### Utilitários

* **Redis GUI** npm install -g redis-commander -> Para rodar redis-commander -p <PORTA>

* **Docker UI Control** docker run -p 9000:9000 -v //var/run/docker.sock:/var/run/docker.sock --name portainer portainer/portainer-ce

* **MONGO GUI** npm install -g mongo-gui, mongo-gui
