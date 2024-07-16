using Tuna.Model.Dto;
using Tuna.Model.Services.Documents;

namespace Tuna.Model.Models.Documents;

public class Document
{
	private readonly IDocumentsRepository _repo;

	public Guid Id { get; }

	public Guid AuthorId { get; }

	public Guid[] ContributorsIds { get; }

	public string Content { get; }

	internal Document(IDocumentsRepository repo, Guid id, string content,
		Guid authorId, Guid[] contributorsIds)
	{
		_repo = repo;
		Id = id;
		Content = content;
		AuthorId = authorId;
		ContributorsIds = contributorsIds;
	}

	private Document(IDocumentsRepository repo, Guid authorId)
		: this(repo, id: Guid.NewGuid(), content: string.Empty, authorId, new[] { authorId })
	{
	}

	public static async Task<IDocumentCreateResult> CreateNewDocument(IDocumentsRepository repo, Guid authorId)
	{
		var document = new Document(repo, authorId);
		await repo.Create(document.ToDto());
		return new DocumentCreatedResult(document);
	}

	private DocumentDto ToDto()
	{
		return new DocumentDto(Id, AuthorId, ContributorsIds, Content);
	}
}