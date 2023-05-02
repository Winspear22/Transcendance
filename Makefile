all: up
up:
	docker-compose up --build

down:
	docker-compose down

rm:
	docker-compose rm

rmi:
	docker-compose down --rmi all

show:
	sudo docker container ps -a

volume_show:
	sudo docker volume ls

volume_delete:
	sudo docker volume prune

post:
	sudo docker exec -it postgresql bash -l
pgadmin:
	sudo docker exec -it pgadmin sh
pgadmin_sudo:
	sudo docker exec -u 0 -it pgadmin sh


.PHONY: up down rm rmi show volume_show volume_delete
