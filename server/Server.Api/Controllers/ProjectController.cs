using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Api.Auth;

namespace Server.Api.Controllers;

[Route("project")]
[Authorize]
public class ProjectController : Controller
{
	[HttpGet("read-all")]
	public IActionResult ReadAll()
	{
		var uid = User.UserId();

		return Ok();
	}
}