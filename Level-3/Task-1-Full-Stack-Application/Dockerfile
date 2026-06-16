FROM node:20-alpine AS backend-builder
WORKDIR /app
COPY backend/package*.json ./
COPY backend/ ./
RUN npm install --production

FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
COPY frontend/ ./
RUN npm install && npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=backend-builder /app/node_modules ./backend/node_modules
COPY --from=frontend-builder /app/dist ./frontend/dist
COPY backend/ ./backend/
WORKDIR /app/backend
EXPOSE 5000
CMD ["node", "src/index.js"]