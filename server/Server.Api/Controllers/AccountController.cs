using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Api.Auth;
using Server.Api.Models;

namespace Server.Api.Controllers;

[Authorize]
[Controller]
public class AccountController : ControllerBase
{
	[HttpGet]
	[ProducesResponseType(typeof(MyAccountInfoDto), StatusCodes.Status200OK)]
	public MyAccountInfoDto Index()
	{
		return new MyAccountInfoDto(User.UserName());
	}
}