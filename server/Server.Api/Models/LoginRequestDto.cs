namespace Server.Api.Models;

public record LoginRequestDto(
	string UserName,
	string Password
);