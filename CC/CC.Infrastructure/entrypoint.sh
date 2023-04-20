#!/bin/bash

# Start the script to create the DB and user
. src/configure-db.sh &

# Start SQL Server
/opt/mssql/bin/sqlservr