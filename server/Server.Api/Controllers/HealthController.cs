using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Server.Api.Auth;
using Tuna.Model.Models.Accounts;

namespace Server.Api.Controllers;

[Route("health")]
public class HealthController : Controller
{
	private readonly ILogger<HealthController> _logger;

	public HealthController(ILogger<HealthController> logger)
	{
		_logger = logger;
	}

	[HttpGet]
	public IActionResult Index()
	{
		_logger.Log(LogLevel.Information, "health check");
		return Content("healthy");
	}

	[HttpGet("set-cookie")]
	public IActionResult SetCookie()
	{
		var expires = DateTime.UtcNow.AddDays(2);
		var jwt = new JwtSecurityToken(
			issuer: "https://localhost",
			audience: "https://localhost",
			claims: new List<Claim>
			{
				new(ClaimTypes.Name, "pumpkin"),
				new(ClaimTypes.Sid, Guid.Empty.ToString())
			},
			expires,
			signingCredentials: new SigningCredentials(
				new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MustMustMustBeStoredInSecretStorage69$$")),
				algorithm: SecurityAlgorithms.HmacSha256
			)
		);
		var tokenString = new JwtSecurityTokenHandler().WriteToken(jwt);

		HttpContext.Response.WriteAccessToken(tokenString, expires);
		return Ok();
	}

	[HttpGet("read-cookie")]
	public ContentResult ReadCookie()
	{
		var cookieShit = Request.TryReadAccessToken();
		return Content(cookieShit ?? "can not read");
	}
}