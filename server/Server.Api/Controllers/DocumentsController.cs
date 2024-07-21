using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Api.Auth;
using Tuna.Model.Dto;
using Tuna.Model.EventHandlers.RequestHandlers.GetMyDocuments;

namespace Server.Api.Controllers;

[Route("documents")]
[Authorize]
public class DocumentsController : Controller
{
	private readonly IMediator _mediator;

	public DocumentsController(IMediator mediator)
	{
		_mediator = mediator;
	}

	[HttpGet("read-all")]
	[ProducesResponseType(typeof(DocumentDto[]), StatusCodes.Status200OK)]
	public async Task<DocumentDto[]> ReadAll()
	{
		return await _mediator.Send(new GetMyDocumentsRequest(User.UserId()));
	}
}