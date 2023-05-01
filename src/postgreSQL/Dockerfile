FROM postgres:13

# Récupérer les variables d'environnement depuis le fichier .env
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_DB=${POSTGRES_DB}

CMD psql -U postgre -d pong

# Exposer le port PostgreSQL
EXPOSE 5432
