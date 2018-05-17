#!/usr/bin/env bash

docker-compose -f docker-compose.yml -p bff build
docker-compose -f docker-compose.yml -p bff run --entrypoint "/bin/sh" bff
