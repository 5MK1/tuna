using Tuna.Model.Dto;

namespace Tuna.Model.Services.Documents;

public interface IDocumentsRepository
{
	Task<DocumentDto?> TryGet(Guid documentId);

	Task Create(DocumentDto dto);
}