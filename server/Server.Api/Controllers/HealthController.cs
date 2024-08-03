using Microsoft.AspNetCore.Mvc;

namespace Server.Api.Controllers;

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