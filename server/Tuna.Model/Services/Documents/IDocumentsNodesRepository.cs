using Tuna.Model.Models.Documents;

namespace Tuna.Model.Services.Documents;

public interface IDocumentsNodesRepository
{
	Task<DocumentNode?> TryGet(Ulid nodeId);

	Task<DocumentNode[]> ReadAllDocumentNodes(Ulid documentId);

	Task UpdateNode(DocumentNode node);
}