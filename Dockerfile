# Fase de construção (build) - usando uma tag disponível oficialmente
FROM maven:3.8.7-openjdk-17 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia primeiro o pom.xml para aproveitar cache de dependências
COPY pom.xml .
# Baixa as dependências (cache separado do build do código)
RUN mvn dependency:go-offline

# Copia o restante do código fonte
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