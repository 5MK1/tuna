using Tuna.Model.Dto.Actions;

namespace Tuna.Model.Services.Documents;

public interface IDocumentNodeActionsRepository
{
	Task Save(DocumentNodeActionDto actionDto);
}