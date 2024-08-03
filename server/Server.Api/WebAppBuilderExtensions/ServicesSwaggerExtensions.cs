using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen.ConventionalRouting;

namespace Server.Api.WebAppBuilderExtensions;

public static class ServicesSwaggerExtensions
{
	public static IServiceCollection AddCustomSwaggerGen(this IServiceCollection services)
	{
		services.AddSwaggerGen(option =>
		{
			option.SwaggerDoc("v1", new OpenApiInfo { Title = "Tuna API", Version = "v1" });
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
			option.SchemaGeneratorOptions.CustomTypeMappings.Add(
				typeof(Ulid),
				() => new OpenApiSchema() { Type = "string" }
			);
		});

		services.AddSwaggerGenWithConventionalRoutes();

		return services;
	}
}