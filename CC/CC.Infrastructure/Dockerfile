FROM mcr.microsoft.com/mssql/server:2022-latest AS base

USER root

# Create a config directory
RUN mkdir -p /usr/config

# Bundle config source
# COPY . /usr/config
# WORKDIR /usr/config
WORKDIR /src

COPY ["CC.Infrastructure/", "src/"]

# Grant permissions for to our scripts to be executable
RUN ["chmod", "+x", "src/entrypoint.sh"]
RUN ["chmod", "+x", "src/configure-db.sh"]

ENTRYPOINT ["src/entrypoint.sh"]
# FROM mcr.microsoft.com/mssql/server:2022-latest AS base

# # COPY CCSeed.sql .
# WORKDIR /src
# COPY ["CC.Infrastructure/CCSeed.sql", "src/CCSeed.sql"]
# COPY ["CC.Infrastructure/setup.sh", "src/setup.sh"]

# ENV ACCEPT_EULA=Y
# ENV sa_password=Pa55w0rd2023
# ENV database=CCommandContext
# ENV accept_eula=Y
# ENV mssql_pid=Express

# CMD ["bash", "src/setup.sh"]

# EXPOSE 1433


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