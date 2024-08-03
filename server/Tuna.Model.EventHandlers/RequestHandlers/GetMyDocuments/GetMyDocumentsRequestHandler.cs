using MediatR;
using Tuna.Model.Dto;
using Tuna.Model.Models.Documents;
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
		var documents = await _repo.ReadByAuthorId(request.AuthorId);
		return documents.Select(doc => doc.Dto()).ToArray();
	}
}