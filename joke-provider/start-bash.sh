#!/usr/bin/env bash

docker-compose -p joke-generator build
docker-compose -p joke-generator run --entrypoint "/bin/sh" joke-generator
