using MediatR;
using Tuna.Model.Models.Accounts;
using Tuna.Model.Services.User;

namespace Tuna.Model.EventHandlers.RequestHandlers;

public class LoginOrRegisterRequestHandler : IRequestHandler<LoginOrRegisterRequest, ILoginResult>
{
	private readonly IUserAccountsRepository _userAccountsRepository;

	public LoginOrRegisterRequestHandler(IUserAccountsRepository userAccountsRepository)
	{
		_userAccountsRepository = userAccountsRepository;
	}

	public async Task<ILoginResult> Handle(LoginOrRegisterRequest request, CancellationToken cancellationToken)
	{
		return await Account.Login(_userAccountsRepository, request.UserName, request.Password);
	}
}