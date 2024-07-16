namespace Tuna.Model.Models.Documents;

public interface IDocumentCreateResult
{
}

public class DocumentCreatedResult
	: IDocumentCreateResult
{
	public Document CratedDocument { get; }

	public DocumentCreatedResult(Document cratedDocument)
	{
		CratedDocument = cratedDocument;
	}
}