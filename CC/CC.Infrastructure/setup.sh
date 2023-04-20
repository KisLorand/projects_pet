#!/bin/bash
set -e
service mssql start
mssql < /mssql/CCSeed.sql
service mssql stop