using Tuna.Model.Dto;

namespace Tuna.Model.Models.Documents;

public class TunaDocument
{
	public Ulid Id { get; }

	public Ulid AuthorId { get; }

	public string Title { get; }

	public DocumentNode[] Nodes { get; private set; }

	public TunaDocument(
		Ulid id,
		Ulid authorId,
		string title
	)
	{
		Id = id;
		AuthorId = authorId;
		Title = title;
		Nodes = Array.Empty<DocumentNode>();
	}


	public TunaDocument WithNodes(DocumentNode[] documentNods)
	{
		Nodes = documentNods;
		return this;
	}

	public static TunaDocument CrateFirstDocument(Ulid authorId)
	{
		return new TunaDocument(
			id: Ulid.NewUlid(),
			authorId,
			title: "My first document"
		);
	}

	public DocumentDto Dto()
	{
		return new DocumentDto(
			Id,
			AuthorId,
			Title,
			Nodes.Select(node => node.Dto()).ToArray()
		);
	}
}