
FROM mcr.microsoft.com/mssql/server:2022-latest AS base

# COPY CCSeed.sql .
WORKDIR /src
COPY ["CC.Infrastructure/CCSeed.sql", "src/CCSeed.sql"]
COPY ["CC.Infrastructure/setup.sh", "src/setup.sh"]

ENV ACCEPT_EULA=Y
ENV sa_password=Pa55w0rd2023

CMD ["bash", "src/setup.sh"]
#RUN bash -c /src/setup.sh




# CMD sqlcmd -i CCSeed.sql && .\start -sa_password $env:SA_PASSWORD \
# -ACCEPT_EULA $env:ACCEPT_EULA -attach_dbs \"$env:attach_dbs\" -Verbose


# WORKDIR /src

# RUN mkdir -p /mssql

# COPY setup.sh ./mssql/setup.sh
# COPY CCSeed.sql ./mssql/CCSeed.sql

# RUN /mssql/setup.sh


# FROM mcr.microsoft.com/mssql/server:2022-latest AS base

# ENV ACCEPT_EULA=Y
# ENV SA_PASSWORD=abcDEF123#
# ENV MSSQL_PID=Developer
# ENV MSSQL_TCP_PORT=1433

# WORKDIR /src

# COPY CCSeed.sql ./CCSeed.sql

# RUN (/opt/mssql/bin/sqlservr --accept-eula & ) | grep -q "Service Broker manager has started" &&  /opt/mssql-tools/bin/sqlcmd -S127.0.0.1 -Usa -PabcDEF123# -i CCSeed.sql