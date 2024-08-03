using Tuna.Model.Dto;

namespace Tuna.Model.Models.Documents;

public class DocumentNode
{
	public Ulid Id { get; }

	public Ulid? ParentNodeId { get; internal set; }

	public string TagName { get; internal set; }

	public string? CssClass { get; internal set; }

	public string? CssStyle { get; internal set; }

	public string? Content { get; internal set; }

	public DocumentNode(
		Ulid id,
		Ulid? parentNodeId,
		string tagName,
		string? cssClass = null,
		string? cssStyle = null,
		string? content = null
	)
	{
		Id = id;
		ParentNodeId = parentNodeId;
		TagName = tagName;
		CssClass = cssClass;
		CssStyle = cssStyle;
		Content = content;
	}

	public DocumentNodeDto Dto()
	{
		return new DocumentNodeDto(
			Id,
			ParentNodeId,
			TagName,
			CssClass,
			CssStyle,
			Content
		);
	}
}