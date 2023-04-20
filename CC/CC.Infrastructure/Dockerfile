
FROM mcr.microsoft.com/mssql/server:2022-latest AS base

WORKDIR /src

RUN mkdir -p /mssql

COPY setup.sh ./mssql/setup.sh
COPY CCSeed.sql ./mssql/CCSeed.sql

RUN /mssql/setup.sh


# FROM mcr.microsoft.com/mssql/server:2022-latest AS base

# ENV ACCEPT_EULA=Y
# ENV SA_PASSWORD=abcDEF123#
# ENV MSSQL_PID=Developer
# ENV MSSQL_TCP_PORT=1433

# WORKDIR /src

# COPY CCSeed.sql ./CCSeed.sql

# RUN (/opt/mssql/bin/sqlservr --accept-eula & ) | grep -q "Service Broker manager has started" &&  /opt/mssql-tools/bin/sqlcmd -S127.0.0.1 -Usa -PabcDEF123# -i CCSeed.sql