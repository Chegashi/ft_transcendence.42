## **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: mochegri <mochegri@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2020/11/04 17:18:52 by mochegri          #+#    #+#              #
#    Updated: 2021/11/27 10:20:23 by mochegri         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

#include ./srcs/.env

SRC = srcs/docker-compose.yml

all :
	sudo mkdir -p $(DB_VOL)
	sudo mkdir -p $(WP_VOL)
	grep -rnw '/etc/hosts' -e '$(DOMAIN_NAME)' > /dev/null \
		|| sudo echo "127.0.0.1  mochegri.42.fr" >> /etc/hosts
	docker-compose -f  ${SRC} up -d

up :
	docker-compose -f  ${SRC} up -d
start:
	docker-compose -f ${SRC} start
down:
	docker-compose -f ${SRC} down
ps:
	docker-compose -f ${SRC} ps

clean :
	docker stop $$(docker ps -qa);\
	docker rm $$(docker ps -qa);\
	docker rmi -f $$(docker images -qa);\
	docker volume rm $$(docker volume ls -q);\
    docker network rm $$(docker network ls -q);

fclean : clean
	docker system prune -a --force
	sudo rm -rf ~/data/*

bonus : all
