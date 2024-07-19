#!/bin/bash
dotnet ef migrations add "$1" --project Tuna.Repository.PostgreSQL --context Tuna.Repository.PostgreSQL.TunaDbContext --startup-project Server.Api --verbose