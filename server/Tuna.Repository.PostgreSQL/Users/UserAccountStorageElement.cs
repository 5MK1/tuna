using System.ComponentModel.DataAnnotations.Schema;

namespace Tuna.Repository.PostgreSQL.Users;

[Table("userAccount")]
public class UserAccountStorageElement
{
	public string Name { get; set; } = string.Empty;

	public string UserId { get; set; } = string.Empty;

	public string PasswordHash { get; set; } = string.Empty;

	public string PasswordSalt { get; set; } = string.Empty;
}