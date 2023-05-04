FROM postgres:13

# Récupérer les variables d'environnement depuis le fichier .env
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_DB=${POSTGRES_DB}

COPY 01-init.sql /docker-entrypoint-initdb.d/

#CMD psql -U postgre -d pong

# Exposer le port PostgreSQL
EXPOSE 5432

CMD ["postgres", "-c", "config_file=/var/lib/postgresql/data/postgresql.conf"]
#Au cas où ton conteneur ne trouve pas le fichier de config, lance la commande par défaut
#tu peux trouver le fichier .conf avec la commande : find / -name postgresql.conf 2>/dev/null
#CMD ["postgres"]