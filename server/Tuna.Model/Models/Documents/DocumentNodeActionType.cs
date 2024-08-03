namespace Tuna.Model.Models.Documents;

public enum DocumentNodeActionType : byte
{
	DocumentCreated = 1,
	UpdateParent = 2,
	UpdateStyle = 3,
	UpdateContent = 4
}