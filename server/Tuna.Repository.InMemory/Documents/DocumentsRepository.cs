using Redis.OM;
using Redis.OM.Searching;
using Tuna.Model.Dto;
using Tuna.Model.Services.Documents;

namespace Tuna.Repository.InMemory.Documents;

public class DocumentsRepository : IDocumentsRepository
{
	private readonly IRedisCollection<DocumentDocument> _documentsCollection;

	public DocumentsRepository(RedisConnectionProvider connectionProvider)
	{
		_documentsCollection = connectionProvider.RedisCollection<DocumentDocument>();
	}

	public async Task<DocumentDto?> TryGet(Guid documentId)
	{
		var document = await _documentsCollection.FindByIdAsync(documentId.ToString());
		return document is null ? null : Map(document);
	}

	public Task Create(DocumentDto dto)
	{
		return _documentsCollection.InsertAsync(Map(dto));
	}

	private static DocumentDocument Map(DocumentDto dto)
	{
		return new DocumentDocument
		{
			Id = dto.Id.ToString(),
			AuthorId = dto.authorId.ToString(),
			Contributors = dto.contributors.Select(guid => guid.ToString()).ToArray(),
			Content = dto.Content
		};
	}

	private static DocumentDto Map(DocumentDocument document)
	{
		return new DocumentDto(
			Guid.Parse(document.Id),
			Guid.Parse(document.AuthorId),
			document.Contributors.Select(Guid.Parse).ToArray(),
			document.Content
		);
	}
}