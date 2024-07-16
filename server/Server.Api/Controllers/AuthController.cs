using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Server.Api.AppSettings;
using Server.Api.Auth;
using Server.Api.Models;
using Tuna.Model.EventHandlers.RequestHandlers;
using Tuna.Model.EventHandlers.RequestHandlers.LoginOrRegister;
using Tuna.Model.Models.Accounts;
using Tuna.Model.Services.User;

namespace Server.Api.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
	private readonly IOptions<JwtSettingsOptions> _jwtSettingsOptions;
	private readonly IMediator _mediator;

	public AuthController(IOptions<JwtSettingsOptions> jwtSettingsOptions, IMediator mediator)
	{
		_jwtSettingsOptions = jwtSettingsOptions;
		_mediator = mediator;
	}

	[HttpPost("login-or-register")]
	[ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
	public async Task<IActionResult> Login(LoginRequestDto requestDto)
	{
		var loginResult = await _mediator.Send(new LoginOrRegisterRequest(requestDto.UserName, requestDto.Password));
		return loginResult switch
		{
			LoginFailedResult res => BadRequest(res.FailureMessage),
			LoginSuccessResult { Account: var account } => GrantAccessTo(account),
			_ => throw new InvalidOperationException()
		};
	}

	[HttpPost("logout")]
	public IActionResult LogOut()
	{
		HttpContext.Response.ExpireCookieAccessToken();
		return Ok();
	}

	private IActionResult GrantAccessTo(Account account)
	{
		var expires = DateTime.UtcNow.AddDays(2);
		var jwt = new JwtSecurityToken(
			issuer: _jwtSettingsOptions.Value.Issuer,
			audience: _jwtSettingsOptions.Value.Audience,
			claims: new List<Claim>
			{
				new(ClaimTypes.Name, account.Name),
				new(ClaimTypes.Sid, account.Id.ToString())
			},
			expires: expires,
			signingCredentials: new SigningCredentials(
				_jwtSettingsOptions.Value.GetSymmetricSecurityKey(),
				algorithm: SecurityAlgorithms.HmacSha256
			)
		);
		var tokenString = new JwtSecurityTokenHandler().WriteToken(jwt);

		HttpContext.Response.WriteAccessTokenToCookie(tokenString, expires);
		return Ok();
	}
}