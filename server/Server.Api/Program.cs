using System.Net;
using Microsoft.OpenApi.Models;
using Redis.OM;
using RedLockNet;
using RedLockNet.SERedis;
using RedLockNet.SERedis.Configuration;
using Server.Api.AppSettings;
using Server.Api.Auth;
using Tuna.Model.Services.User;
using Tuna.Repository.InMemory.Users;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

var cfg = builder.Configuration;
builder.Services.Configure<JwtSettingsOptions>(cfg.GetSection(JwtSettingsOptions.SectionKey));
builder.Services.AddCors(options =>
{
	options.AddPolicy(name:
		MyAllowSpecificOrigins,
		policy => { policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().Build(); }
	);
});
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IUserAccountsRepository, UserAccountRepository>();

builder.Services.AddAuth(cfg);


// fixme: move to settings
var redisCfg = RedisSettings.ReadFrom(cfg);
var redisConnectionProvider = new RedisConnectionProvider(new RedisConnectionConfiguration
{
	Host = redisCfg.Host,
	Port = redisCfg.Port
});

builder.Services.AddSingleton(redisConnectionProvider);
var redLockFactory = RedLockFactory.Create(
	new List<RedLockEndPoint> { new DnsEndPoint(redisCfg.Host, redisCfg.Port) }
);
builder.Services.AddSingleton<IDistributedLockFactory>(redLockFactory);


builder.Services.AddSwaggerGen(option =>
{
	option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
	option.AddSecurityDefinition("Bearer",
		new OpenApiSecurityScheme
		{
			In = ParameterLocation.Header,
			Description = "Please enter a valid token",
			Name = "Authorization",
			Type = SecuritySchemeType.Http,
			BearerFormat = "JWT",
			Scheme = "Bearer"
		});
	option.AddSecurityRequirement(new OpenApiSecurityRequirement
	{
		{
			new OpenApiSecurityScheme
			{
				Reference = new OpenApiReference
				{
					Type = ReferenceType.SecurityScheme,
					Id = "Bearer"
				}
			},
			new string[] { }
		}
	});
});

var app = builder.Build();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseCors(MyAllowSpecificOrigins);
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();