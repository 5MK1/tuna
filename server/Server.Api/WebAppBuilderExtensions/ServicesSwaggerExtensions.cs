using Microsoft.OpenApi.Models;

namespace Server.Api.WebAppBuilderExtensions;

public static class ServicesSwaggerExtensions
{
	public static IServiceCollection AddCustomSwaggerGen(this IServiceCollection services)
	{
		return services.AddSwaggerGen(option =>
		{
			option.SwaggerDoc("v1", new OpenApiInfo { Title = "Tuna API", Version = "v1" });
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
					Array.Empty<string>()
				}
			});
		});
	}
}