#!/bin/bash
set -e
docker stop cloudflarednsupdater || true
docker image prune -f
docker container prune -f
docker volume prune -f
docker network prune -f
docker system prune -f