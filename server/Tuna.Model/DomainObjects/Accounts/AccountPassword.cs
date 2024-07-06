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
		return new PasswordCreatedResult(
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