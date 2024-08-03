namespace Tuna.Repository.PostgreSQL.Abstract;

public interface IStorageElementMutatingMapper<TModel, TStorageElement>
{
	void Map(TModel from, TStorageElement to);
}