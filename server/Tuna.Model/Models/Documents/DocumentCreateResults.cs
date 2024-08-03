namespace Tuna.Model.Models.Documents;

public interface IDocumentCreateResult
{
}

public class DocumentCreatedResult
	: IDocumentCreateResult
{
	public TunaDocument CratedTunaDocument { get; }

	public DocumentCreatedResult(TunaDocument cratedTunaDocument)
	{
		CratedTunaDocument = cratedTunaDocument;
	}
}