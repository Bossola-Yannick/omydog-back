FROM postgres:13

RUN apt-get update && \
    apt-get install -y sqitch libdbd-pg-perl

COPY sqitch.conf  /
COPY /migrations/sqitch.plan /migrations/sqitch.plan
COPY /migrations /migrations
COPY /data/seeding.sql /data/seeding.sql

ENV POSTGRES_DB=omydog
ENV POSTGRES_USER=omydog
ENV POSTGRES_PASSWORD=omydog

EXPOSE 5432