using System.Net.Http.Headers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;

namespace SmartRenderService.Services;

public class AuthService : IAuthService
{
    private readonly HttpClient _httpClient;
    private readonly string _U;
    private readonly string _P;

    public AuthService(HttpClient httpClient, IOptions<AuthOptions> authO)
    {
        _httpClient = httpClient;
        _U = authO.Value.UserName;
        _P = authO.Value.Password;
    }

    public async Task<string?> UPAuthorize()
    {
        var formData = new List<KeyValuePair<string, string>>
        {
            new KeyValuePair<string, string>("username", _U),
            new KeyValuePair<string, string>("password", _P)
        };

        using var content = new FormUrlEncodedContent(formData);
        using HttpResponseMessage httpResponse = await _httpClient.PostAsync("users/authenticate", content);

        if (httpResponse.IsSuccessStatusCode)
        {
            var jsonString = await httpResponse.Content.ReadAsStringAsync();

            UserResponse? response = await httpResponse.Content.ReadFromJsonAsync<UserResponse>();

            if (response != null && !string.IsNullOrEmpty(response.User.Access_Token))
            {
                return response.User.Access_Token;
            }

            throw new Exception("API returned success, but the Access Token was missing or null.");
        }

        string errorContent = await httpResponse.Content.ReadAsStringAsync();
        throw new Exception($"External API Error: {httpResponse.StatusCode} - {errorContent}");
    }
}