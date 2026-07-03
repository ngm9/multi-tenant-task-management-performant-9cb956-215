# Build stage
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --legacy-peer-deps --no-audit --no-fund
COPY . .
ENV CI=false GENERATE_SOURCEMAP=false
RUN npm run build

# Serve stage - instant startup, no webpack dev server overhead
FROM node:20-alpine
RUN npm install -g serve --no-audit --no-fund
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
