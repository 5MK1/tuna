#!/bin/bash
dotnet ef database update --project Tuna.Repository.PostgreSQL --context Tuna.Repository.PostgreSQL.TunaDbContext --startup-project Server.Api --verbose