using MediatR;
using Tuna.Model.Models.Documents;
using Tuna.Model.Services.Documents;

namespace Tuna.Model.EventHandlers.NotificationsHandlers;

public class CreateFirstDocumentNotificationHandler : INotificationHandler<UserAccountCratedNotification>
{
	private readonly IDocumentsRepository _documentsRepository;

	public CreateFirstDocumentNotificationHandler(IDocumentsRepository documentsRepository)
	{
		_documentsRepository = documentsRepository;
	}

	public async Task Handle(UserAccountCratedNotification notification, CancellationToken cancellationToken)
	{
		await Document.CreateNewDocument(_documentsRepository, notification.CratedAccountId);
	}
}