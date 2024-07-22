using MediatR;
using Tuna.Model.Dto;

namespace Tuna.Model.EventHandlers.RequestHandlers.GetMyDocuments;

public class GetMyDocumentsRequest : IRequest<DocumentDto[]>
{
	public Ulid AuthorId { get; }

	public GetMyDocumentsRequest(Ulid authorId)
	{
		AuthorId = authorId;
	}
}