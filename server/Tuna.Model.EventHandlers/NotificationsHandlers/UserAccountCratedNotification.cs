using MediatR;

namespace Tuna.Model.EventHandlers.NotificationsHandlers;

public class UserAccountCratedNotification : INotification
{
	public Guid CratedAccountId { get; }

	public UserAccountCratedNotification(Guid cratedAccountId)
	{
		CratedAccountId = cratedAccountId;
	}
}