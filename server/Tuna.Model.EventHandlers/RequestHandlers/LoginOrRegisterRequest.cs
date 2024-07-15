using MediatR;
using Tuna.Model.Models.Accounts;

namespace Tuna.Model.EventHandlers.RequestHandlers;

public class LoginOrRegisterRequest : IRequest<ILoginResult>
{
	public string UserName { get; }

	public string Password { get; }

	public LoginOrRegisterRequest(string userName, string password)
	{
		UserName = userName;
		Password = password;
	}
}