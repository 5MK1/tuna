using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Server.Api.AppSettings;

public class JwtSettingsOptions
{
	public const string SectionKey = "JwtSettings";

	public string Issuer { get; set; } = string.Empty;

	public string Audience { get; set; } = string.Empty;

	public string Key { get; set; } = string.Empty;

	public SymmetricSecurityKey GetSymmetricSecurityKey() => new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Key));
}
