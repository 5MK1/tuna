using System.Text.Json.Serialization;

namespace Tuna.Repository.PostgreSQL.Documents.StorageElements;

public class DocumentNodeActionData
{
	[JsonPropertyName("tagName")]
	public string TagName { get; set; } = string.Empty;

	[JsonPropertyName("parentNodeId")]
	public string ParentNodeId { get; set; } = string.Empty;

	[JsonPropertyName("cssClass")]
	public string CssClass { get; set; } = string.Empty;

	[JsonPropertyName("cssStyle")]
	public string CssStyle { get; set; } = string.Empty;

	[JsonPropertyName("content")]
	public string Content { get; set; } = string.Empty;
}