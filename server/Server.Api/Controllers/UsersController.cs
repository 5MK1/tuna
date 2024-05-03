using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Server.Api.Auth;
using Tuna.Model.Dto;
using Tuna.Model.Services.User;

namespace Server.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
	private readonly ILogger<UsersController> _logger;
	private readonly IUserAccountsRepository _usersService;
	private readonly IOptions<JwtSettingsOptions> _jwtSettingsOptions;

	public UsersController(
		ILogger<UsersController> logger,
		IUserAccountsRepository usersService,
		IOptions<JwtSettingsOptions> jwtSettingsOptions
	)
	{
		_logger = logger;
		_usersService = usersService;
		_jwtSettingsOptions = jwtSettingsOptions;
	}

	[HttpGet(Name = "ReadUsers")]
	[Authorize]
	public async Task<UserAccountDto[]> ReadUsers()
	{
		return await _usersService.FindAll();
	}
}
