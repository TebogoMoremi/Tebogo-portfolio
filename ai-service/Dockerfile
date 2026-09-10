# ==============================
# BUILD STAGE
# ==============================
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copy Maven configuration first
COPY pom.xml .

# Download dependencies separately for Docker caching
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build Spring Boot application
RUN mvn clean package -DskipTests


# ==============================
# RUNTIME STAGE
# ==============================
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy built JAR from build container
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]