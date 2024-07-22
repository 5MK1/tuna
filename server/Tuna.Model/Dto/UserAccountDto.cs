namespace Tuna.Model.Dto;

public record UserAccountDto(
	Ulid Id,
	string Name,
	byte[] PasswordHash,
	byte[] PasswordSalt
);