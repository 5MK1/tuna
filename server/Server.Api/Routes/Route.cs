using Server.Api.Controllers;
using Swashbuckle.AspNetCore.SwaggerGen.ConventionalRouting;

namespace Server.Api.Routes;

public interface IRouteNode
{
	string Pattern { get; }
	IRouteNode[]? Children { get; }
}

public record RoutesGroup(
	string Pattern,
	IRouteNode[]? Children
) : IRouteNode;

public record ControllerRoute(
	string Name,
	string Pattern,
	string Controller,
	string? Action = null,
	IRouteNode[]? Children = null
) : IRouteNode;

public static class EndpointRouteBuilderExtensions
{
	public static void MapTunaApiRoutes(this IEndpointRouteBuilder endpointRouteBuilder)
	{
		MapControllersRoutesControllers(
			endpointRouteBuilder,
			routes: new IRouteNode[]
			{
				new ControllerRoute(
					Name: "AccountInfo",
					Pattern: "/account/info",
					Controller: nameof(AccountController),
					Action: nameof(AccountController.Index)
				),
				new RoutesGroup(
					Pattern: "auth",
					Children: new IRouteNode[]
					{
						new ControllerRoute(
							Name: "LoginOrRegister",
							Pattern: "login-or-register",
							Controller: nameof(AuthController),
							Action: nameof(AuthController.Login)
						),
						new ControllerRoute(
							Name: "Logout",
							Pattern: "logout",
							Controller: nameof(AuthController),
							Action: nameof(AuthController.LogOut)
						)
					}
				),
				new RoutesGroup(
					Pattern: "documents",
					Children: new IRouteNode[]
					{
						new ControllerRoute(
							Name: "RadAllDocuments",
							Pattern: "read-all",
							Controller: nameof(DocumentsController),
							Action: nameof(DocumentsController.ReadAll)
						),
						new ControllerRoute(
							Name: "RadDocument",
							Pattern: "read/{documentId}",
							Controller: nameof(DocumentsController),
							Action: nameof(DocumentsController.Read)
						)
					}
				),
				new ControllerRoute(
					Name: "Health",
					Pattern: "health",
					Controller: nameof(HealthController)
				)
			}
		);
	}

	private static void MapControllersRoutesControllers(
		IEndpointRouteBuilder endpointRouteBuilder,
		IEnumerable<IRouteNode> routes
	)
	{
		foreach (var route in routes)
		{
			MapRoutesRecursively(endpointRouteBuilder, route, prefix: string.Empty);
		}

		ConventionalRoutingSwaggerGen.UseRoutes(endpointRouteBuilder);
	}

	private static void MapRoutesRecursively(
		IEndpointRouteBuilder endpointRouteBuilder,
		IRouteNode controllerNode,
		string prefix
	)
	{
		switch (controllerNode)
		{
			case RoutesGroup routesGroup:
				AddRoutesGroup(endpointRouteBuilder, routesGroup, prefix);
				return;
			case ControllerRoute controllerRoute:
				MapControllerRoute(endpointRouteBuilder, controllerRoute, prefix);
				return;
			default:
				throw new Exception("Unexpected route node");
		}
	}

	private static void AddRoutesGroup(
		IEndpointRouteBuilder endpointRouteBuilder,
		RoutesGroup routesGroup,
		string prefix
	)
	{
		if (routesGroup.Children is null)
		{
			return;
		}

		var patternPrefix = $"{prefix}/{routesGroup.Pattern}";
		foreach (var child in routesGroup.Children)
		{
			MapRoutesRecursively(endpointRouteBuilder, child, patternPrefix);
		}
	}

	private static void MapControllerRoute(
		IEndpointRouteBuilder endpointRouteBuilder,
		ControllerRoute controllerRoute,
		string prefix
	)
	{
		var pattern = string.IsNullOrEmpty(prefix)
			? controllerRoute.Pattern
			: $"{prefix}/{controllerRoute.Pattern}";
		endpointRouteBuilder.MapControllerRoute(
			controllerRoute.Name,
			pattern,
			defaults: new Dictionary<string, object>
			{
				{ "controller", controllerRoute.Controller[..^10] },
				{ "action", controllerRoute.Action ?? "Index" }
			}
		);
		if (controllerRoute.Children is null)
		{
			return;
		}

		foreach (var child in controllerRoute.Children)
		{
			MapRoutesRecursively(endpointRouteBuilder, child, pattern);
		}
	}
}