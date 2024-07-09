using System.Security.Cryptography;
using System.Text;

namespace Tuna.Model.Models.Accounts;

internal class AccountPassword
{
	internal const byte MIN_PASSWORD_LENGTH = 3;

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

	public static AccountPassword CrateFrom(string passwordString)
	{
		var salt = Guid.NewGuid().ToByteArray();
		var passwordHash = HashBytesFrom(passwordString, salt);
		return new AccountPassword(passwordHash, salt);
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