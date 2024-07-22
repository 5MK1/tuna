using Tuna.Model.Dto;

namespace Tuna.Model.Services.Documents;

public interface IDocumentsRepository
{
	Task<DocumentDto?> TryGet(Ulid documentId);

	Task<DocumentDto[]> SearchByAuthorId(Ulid authorId);

	Task Create(DocumentDto dto);
}