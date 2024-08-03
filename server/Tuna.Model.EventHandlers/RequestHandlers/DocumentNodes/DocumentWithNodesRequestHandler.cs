using MediatR;
using Tuna.Model.Dto;
using Tuna.Model.Models.Documents;
using Tuna.Model.Services.Documents;

namespace Tuna.Model.EventHandlers.RequestHandlers.DocumentNodes;

public class DocumentWithNodesRequestHandler : IRequestHandler<DocumentWithNodesRequest, DocumentDto?>
{
	private readonly IDocumentsRepository _documentsRepository;
	private readonly IDocumentsNodesRepository _nodesRepository;

	public DocumentWithNodesRequestHandler(
		IDocumentsRepository documentsRepository,
		IDocumentsNodesRepository nodesRepository
	)
	{
		_documentsRepository = documentsRepository;
		_nodesRepository = nodesRepository;
	}

	public async Task<DocumentDto?> Handle(DocumentWithNodesRequest request, CancellationToken _)
	{
		var doc = await _documentsRepository.TryGetForAuthorId(request.AuthorId, request.DocumentId);
		if (doc is null)
		{
			return null;
		}

		var documentNods = await _nodesRepository.ReadAllDocumentNodes(doc.Id);
		return doc.WithNodes(documentNods).Dto();
	}
}