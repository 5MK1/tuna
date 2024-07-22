using System.Security.Claims;

namespace Server.Api.Auth;

public static class ClaimsPrincipalExtensions
{
	public static string UserName(this ClaimsPrincipal user)
	{
		return user.FindFirst(ClaimTypes.Name)?.Value ?? string.Empty;
	}

	public static Ulid UserId(this ClaimsPrincipal user)
	{
		var claimValue = user.FindFirst(ClaimTypes.Sid)?.Value;
		return claimValue == null ? Ulid.Empty : Ulid.Parse(claimValue);
	}
}