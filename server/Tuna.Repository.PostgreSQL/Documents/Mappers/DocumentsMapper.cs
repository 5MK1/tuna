using Tuna.Model.Models.Documents;
using Tuna.Repository.PostgreSQL.Abstract;
using Tuna.Repository.PostgreSQL.Documents.StorageElements;

namespace Tuna.Repository.PostgreSQL.Documents.Mappers;

public class DocumentMapper : IRepositoryMapper<TunaDocument, DocumentStorageElement>
{
	public TunaDocument Map(DocumentStorageElement se)
	{
		return new TunaDocument(se.Id, se.AuthorId, se.Title ?? string.Empty);
	}

	public DocumentStorageElement Map(TunaDocument dto)
	{
		return new DocumentStorageElement
		{
			Id = dto.Id,
			AuthorId = dto.AuthorId,
			Title = dto.Title
		};
	}

	public void Map(TunaDocument from, DocumentStorageElement to)
	{
		to.Title = from.Title;
	}
}