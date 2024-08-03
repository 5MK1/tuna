namespace Tuna.Repository.PostgreSQL.Abstract;

public interface IRepositoryMapper<TModel, TStorageElement>
	: IStorageElementMapper<TModel, TStorageElement>,
	  IStorageElementMutatingMapper<TModel, TStorageElement>,
	  IModelMapper<TModel, TStorageElement>
{
}