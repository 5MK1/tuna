using MediatR;
using Tuna.Model.EventHandlers.NotificationsHandlers;
using Tuna.Model.EventHandlers.NotificationsHandlers.UserCreatedHandlers;
using Tuna.Model.Models.Accounts;
using Tuna.Model.Services.User;

namespace Tuna.Model.EventHandlers.RequestHandlers.LoginOrRegister;

public class LoginOrRegisterRequestHandler : IRequestHandler<LoginOrRegisterRequest, ILoginResult>
{
	private readonly IUserAccountsRepository _userAccountsRepository;
	private readonly IMediator _mediator;

	public LoginOrRegisterRequestHandler(IUserAccountsRepository userAccountsRepository, IMediator mediator)
	{
		_userAccountsRepository = userAccountsRepository;
		_mediator = mediator;
	}

	public async Task<ILoginResult> Handle(LoginOrRegisterRequest request, CancellationToken cancellationToken)
	{
		var loginResult = await Account.Login(_userAccountsRepository, request.UserName, request.Password);
		if (loginResult is LoginSuccessResult { AccountJustCrated: true, Account: { Id: var accountId } })
		{
			await _mediator.Publish(new UserAccountCratedNotification(accountId), cancellationToken);
		}

		return loginResult;
	}
}