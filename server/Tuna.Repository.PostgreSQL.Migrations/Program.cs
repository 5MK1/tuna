using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Tuna.Repository.PostgreSQL;

var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")!;
var config = new ConfigurationBuilder()
	.AddJsonFile(
		string.IsNullOrEmpty(environment) ? "appsettings.json" : $"appsettings.{environment}.json",
		optional: false
	)
	.Build();
var connectionString = config.GetConnectionString("Default");

var dbContextOptions = new DbContextOptionsBuilder<TunaDbContext>().UseNpgsql(connectionString);
using var dbContext = new TunaDbContext(dbContextOptions.Options);
dbContext.Database.Migrate();