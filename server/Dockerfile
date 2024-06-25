FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore "Server.Api/Server.Api.csproj"
WORKDIR "/src/Server.Api"
RUN dotnet build "Server.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Server.Api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
ENTRYPOINT ["dotnet", "Server.Api.dll", "--server.urls", "http://+:5000"]
