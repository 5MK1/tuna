using MediatR;
using Tuna.Model.Dto;

namespace Tuna.Model.EventHandlers.RequestHandlers.GetMyDocuments;

public class GetMyDocumentsRequest : IRequest<DocumentDto[]>
{
	public Guid[] Id { get; }

	public GetMyDocumentsRequest(Guid[] id)
	{
		Id = id;
	}
}