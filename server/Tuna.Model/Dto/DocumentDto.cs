namespace Tuna.Model.Dto;

public record DocumentDto(
	Ulid Id,
	Ulid AuthorId,
	string Title,
	DocumentNodeDto[] Nodes
);