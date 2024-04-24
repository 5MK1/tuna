using Redis.OM;
using Tuna.Model.Abstract;
using Tuna.Model.Services.User;
using Tuna.Repository.InMemory.Users;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IUsersService, UsersService>();
builder.Services.AddSingleton<IUsersRepository, UsersRepository>();

// fixme: move to settings
var redisConnectionProvider = new RedisConnectionProvider("redis://localhost:6379");
redisConnectionProvider.Connection.CreateIndex(typeof(UserDocument));
builder.Services.AddSingleton(redisConnectionProvider);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
