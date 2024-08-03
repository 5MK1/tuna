using MediatR;
using Tuna.Model.Dto.Actions;
using Tuna.Model.Models.Documents;
using Tuna.Model.Services.Documents;
using Tuna.Repository.PostgreSQL.Abstract;

namespace Tuna.Model.EventHandlers.NotificationsHandlers.DocumentUpdatedHandlers;

public class DocumentUpdatedNotificationHandler : INotificationHandler<DocumentNodeUpdatedNotification>
{
	private readonly IEnumerable<IDocumentNodeActionFactory> _actionFactories;
	private readonly IDocumentsRepository _docsRepository;
	private readonly IDocumentsNodesRepository _nodesRepository;
	private readonly IDocumentNodeActionsRepository _actionsRepository;
	private readonly ITransactionProvider _transactionProvider;

	public DocumentUpdatedNotificationHandler(
		IEnumerable<IDocumentNodeActionFactory> actionFactories,
		IDocumentsRepository docsRepository,
		IDocumentsNodesRepository nodesRepository,
		IDocumentNodeActionsRepository actionsRepository,
		ITransactionProvider transactionProvider
	)
	{
		_actionFactories = actionFactories.ToArray();
		_docsRepository = docsRepository;
		_nodesRepository = nodesRepository;
		_actionsRepository = actionsRepository;
		_transactionProvider = transactionProvider;
	}

	public async Task Handle(DocumentNodeUpdatedNotification notification, CancellationToken _)
	{
		var actionDto = notification.Action;
		var authorId = notification.Action.UserId;
		var document = await _docsRepository.TryGetForAuthorId(authorId, notification.DocumentId);
		if (document is null)
		{
			throw new Exception("TODO: use specific exception");
		}

		var node = await _nodesRepository.TryGet(notification.Action.NodeId);
		if (node is null)
		{
			throw new Exception("TODO: use specific exception");
		}

		var action = CreateActionFrom(actionDto);
		action.ApplyTo(node);

		await using var transaction = await _transactionProvider.BeginAsync();
		try
		{
			await _nodesRepository.UpdateNode(node);
			await _actionsRepository.Save(action.Dto());
			await transaction.CommitAsync(CancellationToken.None);
		}
		catch
		{
			await transaction.RollbackAsync(CancellationToken.None);
			throw;
		}
	}

	private IDocumentNodeAction CreateActionFrom(DocumentNodeActionDto notification)
	{
		var factoryToExecute = _actionFactories.FirstOrDefault(factory => factory.ActionType == notification.Type);
		if (factoryToExecute is null)
		{
			throw new InvalidOperationException($"Can't find factory for action \"{notification.Type:G}\"");
		}

		return factoryToExecute.Create(notification);
	}
}