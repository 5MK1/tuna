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
}