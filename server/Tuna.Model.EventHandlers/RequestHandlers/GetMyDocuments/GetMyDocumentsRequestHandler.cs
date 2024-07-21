using MediatR;
using Tuna.Model.Dto;
using Tuna.Model.Services.Documents;

namespace Tuna.Model.EventHandlers.RequestHandlers.GetMyDocuments;

public class GetMyDocumentsRequestHandler : IRequestHandler<GetMyDocumentsRequest, DocumentDto[]>
{
	private readonly IDocumentsRepository _repo;

	public GetMyDocumentsRequestHandler(IDocumentsRepository repo)
	{
		_repo = repo;
	}

	public async Task<DocumentDto[]> Handle(GetMyDocumentsRequest request, CancellationToken cancellationToken)
	{
		return await _repo.SearchByAuthorId(request.AuthorId);
	}
}