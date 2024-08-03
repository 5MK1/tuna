using Tuna.Model.Dto.Actions;

namespace Tuna.Model.Models.Documents;

public class DocumentNodeActionFactory : IDocumentNodeActionFactory
{
	public DocumentNodeActionType ActionType => DocumentNodeActionType.DocumentCreated;

	public IDocumentNodeAction Create(DocumentNodeActionDto dto)
	{
		if (dto.Type != ActionType)
		{
			throw new ArgumentException("Unexpected action type");
		}

		if (string.IsNullOrEmpty(dto.TagName))
		{
			throw new ArgumentException($"{nameof(dto)}.{nameof(dto.TagName)}");
		}

		return new DocumentCreatedAction(
			dto.UserId,
			id: Ulid.NewUlid(),
			dto.NodeId,
			dto.ParentNodeId,
			dto.TagName,
			dto.Content
		);
	}
}