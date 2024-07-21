using MediatR;
using Tuna.Model.Dto;

namespace Tuna.Model.EventHandlers.RequestHandlers.GetMyDocuments;

public class GetMyDocumentsRequest : IRequest<DocumentDto[]>
{
	public Guid AuthorId { get; }

	public GetMyDocumentsRequest(Guid authorId)
	{
		AuthorId = authorId;
	}
}