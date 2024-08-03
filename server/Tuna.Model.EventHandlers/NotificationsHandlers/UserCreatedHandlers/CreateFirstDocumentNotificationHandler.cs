using MediatR;
using Tuna.Model.Models.Documents;
using Tuna.Model.Services.Documents;

namespace Tuna.Model.EventHandlers.NotificationsHandlers.UserCreatedHandlers;

public class CreateFirstDocumentNotificationHandler : INotificationHandler<UserAccountCratedNotification>
{
	private readonly IDocumentsRepository _documentsRepository;

	public CreateFirstDocumentNotificationHandler(IDocumentsRepository documentsRepository)
	{
		_documentsRepository = documentsRepository;
	}

	public async Task Handle(UserAccountCratedNotification notification, CancellationToken cancellationToken)
	{
		var document = TunaDocument.CrateFirstDocument(authorId: notification.CratedAccountId);
		await _documentsRepository.Create(document);
	}
}