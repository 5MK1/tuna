using Tuna.Model.Dto.Actions;

namespace Tuna.Model.Models.Documents;

public interface IDocumentNodeAction
{
	Ulid UserId { get; }

	Ulid Id { get; }

	Ulid NodeId { get; }

	void ApplyTo(DocumentNode node);

	DocumentNodeActionDto Dto();
}

public class DocumentCreatedAction : IDocumentNodeAction
{
	public Ulid UserId { get; }

	public Ulid Id { get; }

	public Ulid NodeId { get; }

	public Ulid? ParentNodeId { get; }

	public string TagName { get; }

	public string? Content { get; }

	public DocumentCreatedAction(Ulid userId, Ulid id, Ulid nodeId,
		Ulid? parentNodeId, string tagName, string? content)
	{
		UserId = userId;
		Id = id;
		NodeId = nodeId;
		ParentNodeId = parentNodeId;
		TagName = tagName;
		Content = content;
	}

	public void ApplyTo(DocumentNode node)
	{
		node.ParentNodeId = ParentNodeId;
		node.TagName = TagName;
		node.Content = Content;
	}

	public DocumentNodeActionDto Dto()
	{
		return new DocumentNodeActionDto(
			Id,
			UserId,
			NodeId,
			DocumentNodeActionType.DocumentCreated,
			TagName: TagName,
			Content: Content
		);
	}
}