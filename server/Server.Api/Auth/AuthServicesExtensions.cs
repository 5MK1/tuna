using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace Server.Api.Auth;

public static class AuthServicesExtensions
{
	public static void AddAuth(
		this IServiceCollection serviceCollection,
		IConfiguration configuration
	)
	{
		var cfg = configuration.ExtractJwtConfig();
		serviceCollection
			.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
			.AddJwtBearer(bearerOptions => {
				bearerOptions.TokenValidationParameters = new TokenValidationParameters
				{
					ValidIssuer = cfg.Issuer,
					ValidAudience = cfg.Audience,
					IssuerSigningKey = cfg.GetSymmetricSecurityKey(),
					ValidateIssuer = true,
					ValidateAudience = true,
					ValidateLifetime = true,
					ValidateIssuerSigningKey = true,
				};
			});
	}

	private static JwtSettingsOptions ExtractJwtConfig(this IConfiguration configuration)
	{
		var cfg = new JwtSettingsOptions();
		configuration.Bind(JwtSettingsOptions.SectionKey, cfg);
		return cfg;
	}
}
