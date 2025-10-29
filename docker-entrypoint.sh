#!/bin/sh
set -e

echo "Starting docker entrypoint script for microservicio-usuarios"

TRIES=0
MAX_TRIES=10
DELAY=2

echo "Generating Prisma client..."
npx prisma generate || true

echo "Attempting to apply migrations (will retry up to $MAX_TRIES times)..."
while [ $TRIES -lt $MAX_TRIES ]
do
  if npx prisma migrate deploy; then
    echo "Migrations applied successfully"
    break
  else
    echo "prisma migrate deploy failed (attempt $((TRIES+1))). Retrying in ${DELAY}s..."
    TRIES=$((TRIES+1))
    sleep $DELAY
  fi
done

if [ $TRIES -ge $MAX_TRIES ]; then
  echo "Warning: prisma migrate deploy failed after ${MAX_TRIES} attempts. The container will continue starting but migrations may be inconsistent. Check _prisma_migrations table and logs." >&2
fi

echo "Running prisma db seed (if present)..."
npx prisma db seed || echo "No seed or seed failed (continuing)"

echo "Starting application..."
exec node dist/main
