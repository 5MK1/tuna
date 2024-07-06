namespace Tuna.Model.Services.User;

public interface IUserAccountService
{
	ValueTask<ILoginResult> Login(string userName, string password);
}