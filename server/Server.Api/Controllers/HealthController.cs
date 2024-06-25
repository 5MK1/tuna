using Microsoft.AspNetCore.Mvc;

namespace Server.Api.Controllers;

[Route("health")]
public class HealthController : Controller
{
	public IActionResult Index()
	{
		return Content("healthy");
	}
}