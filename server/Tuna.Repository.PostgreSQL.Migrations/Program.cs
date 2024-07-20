using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Tuna.Repository.PostgreSQL;

var config = new ConfigurationBuilder().Build();
var dbContextOptions = new DbContextOptionsBuilder<TunaDbContext>();
dbContextOptions.UseNpgsql(config.GetConnectionString("Default")!);
using var dbContext = new TunaDbContext(dbContextOptions.Options);
dbContext.Database.Migrate();