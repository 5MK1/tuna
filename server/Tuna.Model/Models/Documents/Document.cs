using Tuna.Model.Dto;
using Tuna.Model.Services.Documents;

namespace Tuna.Model.Models.Documents;

public class Document
{
	private readonly IDocumentsRepository _repo;

	public Ulid Id { get; }

	public Ulid AuthorId { get; }

	public Ulid[] ContributorsIds { get; }

	public string Title { get; }

	internal Document(IDocumentsRepository repo, Ulid id, Ulid authorId,
		Ulid[] contributorsIds, string title)
	{
		_repo = repo;
		Id = id;
		AuthorId = authorId;
		ContributorsIds = contributorsIds;
		Title = title;
	}

	private Document(IDocumentsRepository repo, Ulid authorId)
		: this(repo, id: Ulid.NewUlid(), authorId, contributorsIds: new[] { authorId }, title: string.Empty)
	{
	}

	public static async Task<IDocumentCreateResult> CreateNewDocument(IDocumentsRepository repo, Ulid authorId)
	{
		var document = new Document(repo, authorId);
		await repo.Create(document.ToDto());
		return new DocumentCreatedResult(document);
	}

	private DocumentDto ToDto() => new(Id, AuthorId, ContributorsIds, Title);
}