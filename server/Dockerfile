FROM openjdk:8-jdk-alpine
VOLUME /tmp
COPY build/libs/RH_SERVER.jar RH_SERVER.jar
ENTRYPOINT ["java","-jar","/RH_SERVER.jar"]
EXPOSE 8080