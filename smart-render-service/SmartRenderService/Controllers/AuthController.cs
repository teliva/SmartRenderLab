namespace SmartRenderService.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public sealed class AuthController : ControllerBase
{
    [HttpGet("token")]
    public async Task<IActionResult> Authenticate([FromForm] InternalAuthenticateRequest request, CancellationToken cancellationToken = default)
    {
        var userData = await _authService.LoginInternalUserAsync(request.UserName, request.Password, cancellationToken);
        return Ok(userData);
    }
}