using Tuna.Model.Models.Documents;

namespace Tuna.Model.Dto.Actions;

public record DocumentNodeActionDto(
	Ulid Id,
	Ulid UserId,
	Ulid NodeId,
	DocumentNodeActionType Type,
	string? TagName = null,
	Ulid? ParentNodeId = null,
	string? CssClass = null,
	string? CssStyle = null,
	string? Content = null
);