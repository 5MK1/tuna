using Microsoft.EntityFrameworkCore;
using Tuna.Model.Models.Documents;
using Tuna.Model.Services.Documents;
using Tuna.Repository.PostgreSQL.Abstract;
using Tuna.Repository.PostgreSQL.Documents.StorageElements;

namespace Tuna.Repository.PostgreSQL.Documents;

public class DocumentsNodesRepository : IDocumentsNodesRepository
{
	private readonly TunaDbContext _context;
	private readonly IRepositoryMapper<DocumentNode, DocumentNodeStorageElement> _nodesMapper;

	public DocumentsNodesRepository(
		TunaDbContext context,
		IRepositoryMapper<DocumentNode, DocumentNodeStorageElement> nodesMapper
	)
	{
		_context = context;
		_nodesMapper = nodesMapper;
	}

	public async Task<DocumentNode?> TryGet(Ulid nodeId)
	{
		var storageElement = await _context
			.Nodes
			.FirstOrDefaultAsync(se => se.Id == nodeId);
		return storageElement is null
			? null
			: _nodesMapper.Map(storageElement);
	}

	public async Task<DocumentNode[]> ReadAllDocumentNodes(Ulid documentId)
	{
		var storageElements = await _context
			.Nodes
			.Where(se => se.DocumentId == documentId)
			.ToArrayAsync();
		return storageElements.Select(_nodesMapper.Map).ToArray();
	}

	public async Task UpdateNode(DocumentNode node)
	{
		var storageElement = await _context
			.Nodes
			.FirstAsync(se => se.Id == node.Id);
		_nodesMapper.Map(node, storageElement);
		await _context.SaveChangesAsync();
	}
}