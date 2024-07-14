namespace Server.Api.Auth;

public static class AuthCookieExtensions
{
	private const string TOKEN_KEY = "T";

	public static string? TryReadAccessToken(this HttpRequest request)
	{
		request.Cookies.TryGetValue(TOKEN_KEY, out var accessToken);
		return accessToken;
	}

	public static void WriteAccessToken(this HttpResponse response, string accessToken, DateTimeOffset expires)
	{
		response.Cookies.Append(
			TOKEN_KEY,
			accessToken,
			new CookieOptions
			{
				Expires = expires,
				HttpOnly = true,
				IsEssential = true,
				Secure = true,
				SameSite = SameSiteMode.None
			}
		);
	}
}