using System.Security.Cryptography;
using System.Text;

namespace Tuna.Model.DomainObjects.Accounts;

public class AccountPassword
{
	public const byte MIN_PASSWORD_LENGTH = 3;

	public byte[] PasswordHash { get; }

	public byte[] PasswordSalt { get; }

	public AccountPassword(byte[] passwordHash, byte[] passwordSalt)
	{
		PasswordHash = passwordHash;
		PasswordSalt = passwordSalt;
	}

	public bool EqualsTo(string passwordString)
	{
		return HashBytesFrom(passwordString, PasswordSalt).SequenceEqual(PasswordHash);
	}

	public static ICreatePasswordResult TryCrateFrom(string passwordString)
	{
		if (passwordString.Length < MIN_PASSWORD_LENGTH)
		{
			return CreatePasswordFailedResult.DueToNotEnoughLength(MIN_PASSWORD_LENGTH);
		}

		var salt = Guid.NewGuid().ToByteArray();
		var passwordHash = HashBytesFrom(passwordString, salt);
		return new PasswordCreateResult(
			new AccountPassword(passwordHash, salt)
		);
	}

	private static byte[] HashBytesFrom(string passwordString, byte[] salt)
	{
		var passwordBytes = Encoding.UTF8
			.GetBytes(passwordString)
			.Concat(salt)
			.ToArray();

		return SHA256.HashData(passwordBytes);
	}
}

public interface ICreatePasswordResult
{
}

public class PasswordCreateResult : ICreatePasswordResult
{
	public AccountPassword Password { get; }

	public PasswordCreateResult(AccountPassword password)
	{
		Password = password;
	}
}

public class CreatePasswordFailedResult : ICreatePasswordResult
{
	public string ErrorMessage { get; }

	public CreatePasswordFailedResult(string errorMessage)
	{
		ErrorMessage = errorMessage;
	}

	public static CreatePasswordFailedResult DueToNotEnoughLength(byte minimumLength)
	{
		return new CreatePasswordFailedResult($"Password length must be at least {minimumLength} characters");
	}
}
