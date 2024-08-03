using MediatR;
using Tuna.Model.Dto;

namespace Tuna.Model.EventHandlers.RequestHandlers.DocumentNodes;

public class DocumentWithNodesRequest : IRequest<DocumentDto?>
{
	public Ulid AuthorId { get; }

	public Ulid DocumentId { get; }

	public DocumentWithNodesRequest(Ulid authorId, Ulid documentId)
	{
		AuthorId = authorId;
		DocumentId = documentId;
	}
}