namespace SmartRenderService.Services
{
    public interface IAuthService
    {
        // This matches the method signature in your AuthService
        Task<string?> UPAuthorize();
    }
}