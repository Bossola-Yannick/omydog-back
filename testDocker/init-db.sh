#!/bin/bash
set -e

# Démarrer PostgreSQL en arrière-plan
docker-entrypoint.sh postgres &

# Attendre que PostgreSQL soit prêt
until pg_isready -h localhost; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done

# Exécuter les migrations Sqitch
sqitch deploy db:pg://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:5432/$POSTGRES_DB

# Exécuter le script de seeding
psql -U $POSTGRES_USER -d $POSTGRES_DB -f /data/seeding.sql

# Attendre les processus en arrière-plan
wait