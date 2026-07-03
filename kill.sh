#!/bin/bash
set -e

echo "Stopping containers..."
docker-compose -f /root/task/docker-compose.yml down --volumes --remove-orphans || true

IMAGES=$(docker images | grep 'utkrusht' | awk '{print $3}')
for IMAGE in $IMAGES; do
  docker rmi -f $IMAGE || true
done

docker system prune -a --volumes -f
rm -rf /root/task || true
echo "Cleanup completed successfully! Droplet is now clean."
