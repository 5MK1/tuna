namespace Tuna.Repository.PostgreSQL.Abstract;

public interface IModelMapper<TModel, TStorageElement>
{
	TStorageElement Map(TModel model);
}