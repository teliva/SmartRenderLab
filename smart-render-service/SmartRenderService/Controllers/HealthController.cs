using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace SmartRenderService.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public sealed class HealthController : ControllerBase
{
    private static readonly HealthStatus HealthyResult = new(
        Assembly.GetExecutingAssembly().GetName().Version?.ToString(),
        System.IO.File.GetLastWriteTime(Assembly.GetExecutingAssembly().Location));

    [HttpGet("ping")]
    public IActionResult Ping() => Ok(HealthyResult);

    private record HealthStatus(string? version, DateTime buildDate);
}