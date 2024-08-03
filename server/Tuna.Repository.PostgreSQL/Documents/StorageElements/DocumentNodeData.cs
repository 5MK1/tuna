using System.Text.Json.Serialization;

namespace Tuna.Repository.PostgreSQL.Documents.StorageElements;

public class DocumentNodeData
{
	[JsonPropertyName("tag")]
	public string TagName { get; set; } = string.Empty;

	[JsonPropertyName("class")]
	public string? CssClassName { get; set; }

	[JsonPropertyName("style")]
	public string? CssStyle { get; set; }

	[JsonPropertyName("content")]
	public string? Content { get; set; }
}