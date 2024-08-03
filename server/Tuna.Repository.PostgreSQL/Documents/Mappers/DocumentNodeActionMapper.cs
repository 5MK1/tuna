using Tuna.Model.Dto.Actions;
using Tuna.Repository.PostgreSQL.Abstract;
using Tuna.Repository.PostgreSQL.Documents.StorageElements;

namespace Tuna.Repository.PostgreSQL.Documents.Mappers;

public class DocumentNodeActionMapper : IModelMapper<DocumentNodeActionDto, DocumentNodeActionStorageElement>
{
	public DocumentNodeActionStorageElement Map(DocumentNodeActionDto dto)
	{
		return new DocumentNodeActionStorageElement
		{
			Id = dto.Id,
			UserId = dto.UserId,
			DocumentNodeId = dto.NodeId,
			CreatedAt = DateTime.UtcNow,
			ActionType = dto.Type.ToString(format: "G"),
			Data = new DocumentNodeActionData
			{
				TagName = dto.TagName ?? string.Empty,
				ParentNodeId = dto.ParentNodeId?.ToString() ?? string.Empty,
				CssClass = dto.CssClass ?? string.Empty,
				CssStyle = dto.CssStyle ?? string.Empty,
				Content = dto.Content ?? string.Empty
			}
		};
	}
}