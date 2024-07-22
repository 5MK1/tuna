namespace Tuna.Model.Dto;

public record DocumentDto(
	Ulid Id,
	Ulid AuthorId,
	Ulid[] Contributors,
	string Title
);