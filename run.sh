#!/bin/bash
set -e

echo "Starting Utkrusht TaskMgr MERN stack..."
docker-compose -f /root/task/docker-compose.yml up -d

echo "Waiting for MongoDB (max 60s)..."
MAX_ATTEMPTS=30
ATTEMPT=1
while true; do
  if [ "$ATTEMPT" -gt "$MAX_ATTEMPTS" ]; then
    echo "ERROR: MongoDB did not become ready in time."
    docker-compose -f /root/task/docker-compose.yml logs mongo || true
    exit 1
  fi
  if docker exec utkrusht-mongo mongosh --quiet --eval 'db.runCommand({ ping: 1 })' >/dev/null 2>&1; then
    echo "MongoDB is up."
    break
  fi
  echo "MongoDB not ready yet (attempt $ATTEMPT/$MAX_ATTEMPTS)..."
  ATTEMPT=$((ATTEMPT + 1))
  sleep 2
done

echo "Checking backend health (max 60s)..."
MAX_ATTEMPTS=20
ATTEMPT=1
while true; do
  if [ "$ATTEMPT" -gt "$MAX_ATTEMPTS" ]; then
    echo "ERROR: Backend did not become ready in time."
    docker-compose -f /root/task/docker-compose.yml logs backend || true
    exit 1
  fi
  if curl -sf -o /dev/null http://localhost:5000/api/health; then
    echo "Backend is up."
    break
  fi
  echo "Backend not ready yet (attempt $ATTEMPT/$MAX_ATTEMPTS)..."
  ATTEMPT=$((ATTEMPT + 1))
  sleep 3
done

echo "Checking frontend (max 60s)..."
MAX_ATTEMPTS=20
ATTEMPT=1
while true; do
  if [ "$ATTEMPT" -gt "$MAX_ATTEMPTS" ]; then
    echo "ERROR: Frontend did not become ready in time."
    docker-compose -f /root/task/docker-compose.yml logs frontend || true
    exit 1
  fi
  if curl -sf -o /dev/null http://localhost:3000; then
    echo "Frontend is up."
    break
  fi
  echo "Frontend not ready yet (attempt $ATTEMPT/$MAX_ATTEMPTS)..."
  ATTEMPT=$((ATTEMPT + 1))
  sleep 3
done

echo "Utkrusht TaskMgr application is running."
