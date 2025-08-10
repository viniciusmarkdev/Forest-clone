# Fase de construção (build)
FROM maven:3.8.6-openjdk-17 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia todos os arquivos do projeto
COPY pom.xml .
COPY src ./src

# Executa o build do Maven, pulando os testes
RUN mvn clean package -DskipTests

# Fase de execução
FROM openjdk:17-jdk-slim

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo JAR gerado na fase de build
COPY --from=build /app/target/*.jar app.jar

# Expõe a porta que a aplicação vai rodar
EXPOSE 8080

# Comando para executar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]