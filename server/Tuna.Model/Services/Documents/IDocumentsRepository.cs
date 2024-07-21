using Tuna.Model.Dto;

namespace Tuna.Model.Services.Documents;

public interface IDocumentsRepository
{
	Task<DocumentDto?> TryGet(Guid documentId);

	Task<DocumentDto[]> SearchByAuthorId(Guid authorId);

	Task Create(DocumentDto dto);
}