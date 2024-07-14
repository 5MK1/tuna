using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Api.Auth;
using Server.Api.Models;

namespace Server.Api.Controllers;

[ApiController]
[Route("account")]
[Authorize]
public class AccountController : ControllerBase
{
	[HttpGet("info")]
	[ProducesResponseType(typeof(MyAccountInfoDto), StatusCodes.Status200OK)]
	public MyAccountInfoDto Index()
	{
		return new MyAccountInfoDto(User.UserName());
	}
}