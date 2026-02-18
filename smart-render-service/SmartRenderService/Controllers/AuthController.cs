using Asp.Versioning;
using SmartRenderService.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;

namespace SmartRenderService.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public sealed class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpGet("token")]
    public async Task<IActionResult> Authenticate()
    {
        string? token = await _authService.UPAuthorize();

        if (string.IsNullOrEmpty(token))
        {
            return StatusCode(500, "Failed to retrieve authentication token.");
        }

        return Ok(new TokenResponse { accessToken = token });
    }
}