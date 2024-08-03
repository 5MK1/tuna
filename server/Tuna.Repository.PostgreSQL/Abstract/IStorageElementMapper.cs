namespace Tuna.Repository.PostgreSQL.Abstract;

public interface IStorageElementMapper<TModel, TStorageElement>
{
	TModel Map(TStorageElement se);
}