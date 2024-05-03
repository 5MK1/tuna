using Microsoft.OpenApi.Models;
using Redis.OM;
using Server.Api.Auth;
using Tuna.Model.Services.User;
using Tuna.Repository.InMemory.Users;

var builder = WebApplication.CreateBuilder(args);

var cfg = builder.Configuration;
builder.Services.Configure<JwtSettingsOptions>(cfg.GetSection(JwtSettingsOptions.SectionKey));

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IUserAccountService, UserAccountService>();
builder.Services.AddSingleton<IUserAccountsRepository, UserAccountRepository>();

builder.Services.AddAuth(cfg);


// fixme: move to settings
var redisConnectionProvider = new RedisConnectionProvider(new RedisConnectionConfiguration
{
	Host = "redis",
	Port = 6379
});

// fixme: move to repo
redisConnectionProvider.Connection.CreateIndex(typeof(UserAccountDocument));
builder.Services.AddSingleton(redisConnectionProvider);


builder.Services.AddSwaggerGen(option => {
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
			new string[] {}
		}
	});
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
