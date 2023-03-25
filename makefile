up:
	docker compose up -d --build

down:
	docker compose down
mongo:
	docker run -d  --name mongo-todo \
	-p 27017:27017 \
	mongo	

delete_all:
	docker 	rm $(docker ps -a -q) -f

#	-e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
#	-e MONGO_INITDB_ROOT_PASSWORD=secret \
