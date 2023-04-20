#!/bin/bash
set -e
mssql start
mssql < /src/CCSeed.sql
service mssql stop