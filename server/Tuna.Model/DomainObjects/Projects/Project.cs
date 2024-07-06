namespace Tuna.Model.DomainObjects.Projects;

public class Project
{
	public Guid ProjectId { get; }

	public ProjectContributor[] Contributors { get; }

	public Project(Guid projectId, ProjectContributor[] contributors)
	{
		ProjectId = projectId;
		Contributors = contributors;
	}

	public static Project NewProject(ProjectContributor contributor)
	{
		return new Project(Guid.NewGuid(), new[] { contributor });
	}
}

public record ProjectContributor(string Name, Guid UserId);

public interface ICreateProjectResult
{
}

public class ProjectCreatedResult : ICreateProjectResult
{
	Task<Guid> NewProjectId { get; }

	public ProjectCreatedResult(Task<Guid> newProjectId)
	{
		NewProjectId = newProjectId;
	}
}

public class ProjectNotCreatedResult : ICreateProjectResult
{
	public ProjectCreationFailureReason Reason { get; }

	public ProjectNotCreatedResult(ProjectCreationFailureReason reason)
	{
		Reason = reason;
	}
}

public enum ProjectCreationFailureReason
{
	AlreadyExists = 1,
}