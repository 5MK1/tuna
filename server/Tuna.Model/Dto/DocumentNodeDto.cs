namespace Tuna.Model.Dto;

public record DocumentNodeDto(
	Ulid Id,
	Ulid? ParentNodeId,
	string TagName,
	string? CssClass,
	string? CssStyle,
	string? Content
);