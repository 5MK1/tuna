using FluentAssertions;
using NSubstitute;
using Tuna.Model.Dto;
using Tuna.Model.Models.Accounts;
using Tuna.Model.Services.User;

namespace Tuna.Model.Tests;

public class AccountTests
{
	private readonly IUserAccountsRepository _repo = Substitute.For<IUserAccountsRepository>();

	[Fact]
	public async Task AccountLogin_Should_ReturnError_When_UserNameIsTooShort()
	{
		var loginResult = await Account.Login(_repo, userName: "a", password: "a");

		loginResult.Should()
			.BeOfType<LoginFailedResult>()
			.Which
			.FailureMessage
			.Should()
			.Contain("name");
	}

	[Fact]
	public async Task AccountLogin_Should_ReturnError_When_PasswordIsTooShort()
	{
		var loginResult = await Account.Login(_repo, userName: "LongUserName", password: "a");

		loginResult.Should()
			.BeOfType<LoginFailedResult>()
			.Which
			.FailureMessage
			.Should()
			.Contain("password");
	}

	[Fact]
	public async Task AccountLogin_Should_ReturnError_When_AccountExistsAndPasswordDontMatch()
	{
		const string name = "user";
		var userPassword = AccountPassword.CrateFrom("correctPassword");
		_repo.TryGet(name)!
			.Returns(
				Task.FromResult(
					new UserAccountDto(Guid.Empty, name, userPassword.PasswordHash, userPassword.PasswordSalt)
				)
			);

		var loginResult = await Account.Login(_repo, name, "wrongPassword");

		loginResult.Should()
			.BeOfType<LoginFailedResult>()
			.Which
			.FailureMessage
			.Should()
			.Contain("password");
	}

	[Fact]
	public async Task AccountLogin_Should_ReturnSuccessResult_When_AccountExistsAndPasswordCorrect()
	{
		const string name = "user";
		const string password = "password";
		var id = Guid.NewGuid();
		var userPassword = AccountPassword.CrateFrom(password);
		_repo.TryGet(name)!
			.Returns(
				Task.FromResult(
					new UserAccountDto(id, name, userPassword.PasswordHash, userPassword.PasswordSalt)
				)
			);

		var loginResult = await Account.Login(_repo, name, password);

		loginResult.Should()
			.BeOfType<LoginSuccessResult>()
			.Which
			.Account
			.Should()
			.BeEquivalentTo(new { Name = name, Id = id });
	}

	[Fact]
	public async Task AccountLogin_Should_ReturnSuccessResult_When_AccountNotExists()
	{
		const string name = "user";
		const string password = "password";
		_repo.TryGet(name)!
			.Returns(Task.FromResult<UserAccountDto?>(null));

		var loginResult = await Account.Login(_repo, name, password);

		loginResult.Should()
			.BeOfType<LoginSuccessResult>()
			.Which
			.Account
			.Should()
			.BeEquivalentTo(new { Name = name });
	}
}