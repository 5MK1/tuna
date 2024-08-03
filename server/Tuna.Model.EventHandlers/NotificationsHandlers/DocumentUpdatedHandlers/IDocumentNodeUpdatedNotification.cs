using MediatR;
using Tuna.Model.Dto.Actions;

namespace Tuna.Model.EventHandlers.NotificationsHandlers.DocumentUpdatedHandlers;

public class DocumentNodeUpdatedNotification : INotification
{
	public Ulid DocumentId { get; }

	public DocumentNodeActionDto Action { get; }

	public DocumentNodeUpdatedNotification(Ulid documentId, DocumentNodeActionDto action)
	{
		DocumentId = documentId;
		Action = action;
	}
}