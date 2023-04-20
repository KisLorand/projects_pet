FROM mcr.microsoft.com/mssql/server:2022-latest AS base

USER root
# Create a config directory
RUN mkdir -p /usr/config

WORKDIR /src

COPY ["CC.Infrastructure/", "src/"]

# Grant permissions for to our scripts to be executable
RUN ["chmod", "+x", "src/entrypoint.sh"]
RUN ["chmod", "+x", "src/configure-db.sh"]

ENTRYPOINT ["src/entrypoint.sh"]
