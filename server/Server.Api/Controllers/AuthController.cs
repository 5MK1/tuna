using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Server.Api.AppSettings;
using Server.Api.Auth;
using Server.Api.Models;
using Tuna.Model.Services.User;

namespace Server.Api.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
	private readonly IOptions<JwtSettingsOptions> _jwtSettingsOptions;
	private readonly IUserAccountService _accountService;

	public AuthController(
		IOptions<JwtSettingsOptions> jwtSettingsOptions,
		IUserAccountService accountService
	)
	{
		_jwtSettingsOptions = jwtSettingsOptions;
		_accountService = accountService;
	}

	[HttpPost("login-or-register")]
	[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
	public async Task<IActionResult> Login(LoginRequestDto requestDto)
	{
		var loginResult = await _accountService.Login(requestDto.UserName, requestDto.Password);
		return loginResult switch
		{
			LoginFailedResult res => BadRequest(res.FailureMessage),
			LoginSuccessResult res => Ok(CreateJwtSecurityToken(res.UserName, res.UserId)),
			_ => throw new InvalidOperationException()
		};
	}

	private string CreateJwtSecurityToken(string userName, Guid userId)
	{
		var jwt = new JwtSecurityToken(
			issuer: _jwtSettingsOptions.Value.Issuer,
			audience: _jwtSettingsOptions.Value.Audience,
			claims: new List<Claim>
			{
				new(ClaimTypes.Name, userName),
				new(ClaimTypes.Sid, userId.ToString())
			},
			expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(2)),
			signingCredentials: new SigningCredentials(
				_jwtSettingsOptions.Value.GetSymmetricSecurityKey(),
				algorithm: SecurityAlgorithms.HmacSha256
			)
		);
		return new JwtSecurityTokenHandler().WriteToken(jwt);
	}
}