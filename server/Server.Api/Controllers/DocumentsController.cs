using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Api.Auth;

namespace Server.Api.Controllers;

[Route("documents")]
[Authorize]
public class DocumentsController : Controller
{
	[HttpGet("read-all")]
	public IActionResult ReadAll()
	{
		var uid = User.UserId();

		return Ok();
	}
}