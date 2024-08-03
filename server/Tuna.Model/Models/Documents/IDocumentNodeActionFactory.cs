using Tuna.Model.Dto.Actions;

namespace Tuna.Model.Models.Documents;

public interface IDocumentNodeActionFactory
{
	DocumentNodeActionType ActionType { get; }

	IDocumentNodeAction Create(DocumentNodeActionDto actionData);
}