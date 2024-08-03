using Microsoft.EntityFrameworkCore;
using Server.Api.AppSettings;
using Server.Api.Auth;
using Server.Api.Routes;
using Server.Api.WebAppBuilderExtensions;
using Tuna.Model;
using Tuna.Model.EventHandlers;
using Tuna.Repository.InMemory;
using Tuna.Repository.PostgreSQL;

const string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

var cfg = builder.Configuration;
builder.Services.Configure<JwtSettingsOptions>(cfg.GetSection(JwtSettingsOptions.SectionKey));
builder.Services.AddCors(options =>
{
	options.AddPolicy(name:
		MyAllowSpecificOrigins,
		policy =>
		{
			policy
				.WithOrigins("https://localhost:3000")
				.AllowCredentials()
				.AllowAnyMethod()
				.AllowAnyHeader()
				.Build();
		}
	);
});

builder.Services.AddControllers();
builder.Services.AddMediatR(
	mediatrCfg => mediatrCfg.RegisterServicesFromAssembly(typeof(ModelEventHandlersAssemblyMark).Assembly)
);
builder.Services.Scan(
	selector => selector
		.AddScopedBySuffixFor<IRepositoryInMemoryAssemblyMarker>("Repository")
		.AddScopedBySuffixFor<RepositoryPostgreSqlAssemblyMarker>("Repository")
		.AddScopedBySuffixFor<RepositoryPostgreSqlAssemblyMarker>("Mapper")
		.AddScopedBySuffixFor<ModelAssemblyMark>("Factory")
);
builder.Services.AddTransactionProvider();
builder.Services.AddAuth(cfg);
builder.Services.AddRedis(RedisSettings.ReadFrom(cfg));
builder.Services.AddDbContext<TunaDbContext>(
	optionsAction =>
	{
		optionsAction.UseNpgsql(cfg.GetConnectionString("default")!);
	}
);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCustomSwaggerGen();

var app = builder.Build();
app.MapTunaApiRoutes();
app.UseHttpsRedirection();
app.UseStaticFiles();

if (app.Environment.IsDevelopment() || app.Environment.IsStaging())
{
	app.UseCors(MyAllowSpecificOrigins);
}

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

//app.MapControllers();

app.Run();