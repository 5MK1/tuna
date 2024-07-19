namespace Tuna.Model.Dto;

public record DocumentDto(
	Guid Id,
	Guid AuthorId,
	Guid[] Contributors,
	string Content
);