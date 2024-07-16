namespace Tuna.Model.Dto;

public record DocumentDto(
	Guid Id,
	Guid authorId,
	Guid[] contributors,
	string Content
);