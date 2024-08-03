using Tuna.Model.Models.Documents;

namespace Tuna.Model.Services.Documents;

public interface IDocumentsRepository
{
	Task<TunaDocument?> TryGetForAuthorId(Ulid authorId, Ulid documentId);

	Task<TunaDocument[]> ReadByAuthorId(Ulid authorId);

	Task Create(TunaDocument dto);
}