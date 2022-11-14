mongo:
	docker run -d  --name mongo-todo \
	-p 27017:27017 \
	mongo	
	

#	-e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
#	-e MONGO_INITDB_ROOT_PASSWORD=secret \
