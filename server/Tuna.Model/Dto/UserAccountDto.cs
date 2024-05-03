namespace Tuna.Model.Dto;

public record UserAccountDto(
	Guid Id,
	string Name,
	byte[] PasswordHash,
	byte[] PasswordSalt
);
