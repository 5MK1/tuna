using Microsoft.AspNetCore.Mvc;
using Tuna.Model.Dto;
using Tuna.Model.Services.User;

namespace Server.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
	private readonly ILogger<UsersController> _logger;
	private readonly IUsersService _usersService;

	public UsersController(ILogger<UsersController> logger, IUsersService usersService)
	{
		_logger = logger;
		_usersService = usersService;
	}

	[HttpGet(Name = "ReadUsers")]
	public async Task<UserDto[]> ReadUsers()
	{
		return await _usersService.FindAll();
	}

	[HttpPut(Name = "AddUser")]
	public async Task<IActionResult> AddUser(UserDto userDto)
	{
		await _usersService.Save(userDto);
		return Ok();
	}
}
