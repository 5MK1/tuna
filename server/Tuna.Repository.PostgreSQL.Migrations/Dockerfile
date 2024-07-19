FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore Tuna.Repository.PostgreSQL.Migrations.csproj --disable-parallel

FROM build AS publish
RUN dotnet publish Tuna.Repository.PostgreSQL.Migrations.csproj -c Release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=publish /app ./

ENTRYPOINT ["dotnet", "Tuna.Repository.PostgreSQL.Migrations.dll"]