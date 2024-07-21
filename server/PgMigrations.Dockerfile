FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore "Tuna.Repository.PostgreSQL.Migrations/Tuna.Repository.PostgreSQL.Migrations.csproj"
WORKDIR "/src/Tuna.Repository.PostgreSQL.Migrations"
RUN dotnet build "Tuna.Repository.PostgreSQL.Migrations.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Tuna.Repository.PostgreSQL.Migrations.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Tuna.Repository.PostgreSQL.Migrations.dll"]