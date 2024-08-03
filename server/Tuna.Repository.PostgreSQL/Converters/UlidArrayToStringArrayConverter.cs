using Npgsql.EntityFrameworkCore.PostgreSQL.Storage.ValueConversion;

namespace Tuna.Repository.PostgreSQL.Converters;

public class UlidArrayToStringArrayConverter : NpgsqlArrayConverter<Ulid[], string[]>
{
	public UlidArrayToStringArrayConverter()
		: base(elementConverter: new UlidToStringConverter())
	{
	}
}
