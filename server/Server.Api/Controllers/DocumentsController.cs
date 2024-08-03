using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Api.Auth;
using Tuna.Model.Dto;
using Tuna.Model.EventHandlers.RequestHandlers.DocumentNodes;
using Tuna.Model.EventHandlers.RequestHandlers.GetMyDocuments;

namespace Server.Api.Controllers;

[Authorize]
public class DocumentsController : Controller
{
	private readonly IMediator _mediator;

	public DocumentsController(IMediator mediator)
	{
		_mediator = mediator;
	}

	[HttpGet]
	[ProducesResponseType(typeof(DocumentDto[]), StatusCodes.Status200OK)]
	public async Task<DocumentDto[]> ReadAll()
	{
		return await _mediator.Send(new GetMyDocumentsRequest(User.UserId()));
	}

	[HttpGet]
	[ProducesResponseType(typeof(DocumentDto), StatusCodes.Status200OK)]
	public async Task<IActionResult> Read([FromRoute] Ulid documentId)
	{
		var doc = await _mediator.Send(new DocumentWithNodesRequest(User.UserId(), documentId));
		return doc is null ? NotFound() : Ok(doc);
	}
}