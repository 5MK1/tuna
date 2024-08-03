using Tuna.Model.Models.Documents;
using Tuna.Repository.PostgreSQL.Abstract;
using Tuna.Repository.PostgreSQL.Documents.StorageElements;

namespace Tuna.Repository.PostgreSQL.Documents.Mappers;

public class DocumentNodeMapper : IRepositoryMapper<DocumentNode, DocumentNodeStorageElement>
{
	public DocumentNode Map(DocumentNodeStorageElement se)
	{
		return new DocumentNode(
			se.Id,
			se.ParentNodeId,
			se.Data.TagName,
			se.Data.CssClassName,
			se.Data.CssStyle,
			se.Data.Content
		);
	}

	public DocumentNodeStorageElement Map(DocumentNode model)
	{
		return new DocumentNodeStorageElement
		{
			Id = model.Id,
			ParentNodeId = model.ParentNodeId,
			Data = new DocumentNodeData
			{
				TagName = model.TagName,
				CssClassName = model.CssClass,
				CssStyle = model.CssStyle,
				Content = model.Content
			}
		};
	}

	public void Map(DocumentNode from, DocumentNodeStorageElement to)
	{
		to.ParentNodeId = from.ParentNodeId;
		to.Data.Content = from.Content;
		to.Data.CssStyle = from.CssStyle;
		to.Data.TagName = from.TagName;
		to.Data.CssClassName = from.CssClass;
	}
}