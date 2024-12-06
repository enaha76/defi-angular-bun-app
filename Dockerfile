# Stage 1: Build with Bun
FROM oven/bun:latest as build

WORKDIR /app

# Copy configuration and lock files
COPY package.json .
COPY bun.lockb .
COPY angular.json .
COPY tsconfig.json .

# Install dependencies using Bun
RUN bun install

# Copy source files
COPY src/ src/

# Build the Angular project using bun x (instead of npx)
RUN bun x ng build --configuration production

# Stage 2: Serve with Nginx
FROM nginx:alpine
RUN rm /usr/share/nginx/html/*

# Replace "your-app-name" with the actual output folder name
COPY --from=build /app/dist/your-app-name/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
