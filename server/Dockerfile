FROM openjdk:8-jdk-alpine

VOLUME /tmp

COPY build/libs/RH_SERVER.jar RH_SERVER.jar

ENTRYPOINT ["java","-jar","/RH_SERVER.jar"]

HEALTHCHECK --interval=5s --timeout=3s CMD wget -q -O- http://localhost:8090/actuator/health | grep UP

EXPOSE 8080