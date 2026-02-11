
namespace SmartRenderService.Services;

public class AuthService
{
    private readonly HttpClient _httpClient;
    private readonly string BASE_URL;

    public AuthService(HttpClient httpClient, IOptions<AppSettings> options)
    {
        _httpClient = httpClient;
        _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        BASE_URL = options.Value.KitsWebApiURL;
    }

    public async Task<Models.Domain.User> LoginInternalUserAsync(string username, string password, CancellationToken cancellationToken = default)
    {
        string requestUrl = $"{BASE_URL}/users/authenticate";

        var formData = new List<KeyValuePair<string, string>>
     {
         new KeyValuePair<string, string>("username", username),
         new KeyValuePair<string, string>("password", password)
     };

        // 2. Create the content object. This encodes the data and sets the Content-Type.
        using var content = new FormUrlEncodedContent(formData);

        using HttpResponseMessage httpResponse = await _httpClient.PostAsync(requestUrl, content, cancellationToken);

        if (httpResponse.IsSuccessStatusCode)
        {
            InternalUserLoginResponse? response = await httpResponse.Content.ReadFromJsonAsync<InternalUserLoginResponse>(cancellationToken: cancellationToken);

            if (response is null)
                throw new ExternalServerException("Successful API call but response body was unexpectedly empty.");

            var internalUser = response.User;

            return new Models.Domain.User
            {
                UserId = response.User.UserId,
                Name = response.User.Name,
                FirstName = response.User.FirstName,
                LastName = response.User.LastName,
                TelephoneNo = response.User.TelephoneNo,
                Email = response.User.Email,
                CompanyName = response.User.CompanyName,
                Address1 = response.User.Address1,
                City = response.User.City,
                State = response.User.State,
                PostalCode = response.User.PostalCode,
                Country = response.User.Country,
                UserType = response.User.UserType,
                DealerId = response.User.DealerId,
                LicenseAccess = response.User.LicenseAccess,
                Access_Token = response.User.Access_Token,
                Refresh_Token = response.User.Refresh_Token,
                Expires_In = response.User.Expires_In,
                Profile = new Models.Domain.Profile
                {
                    NumResultReturn = internalUser.Profile.NumResultReturn,
                    DefaultPriceZone = internalUser.Profile.DefaultPriceZone
                }
            };
        }
        else
        {
            string errorContent = await httpResponse.Content.ReadAsStringAsync(cancellationToken);

            throw httpResponse.StatusCode switch
            {
                System.Net.HttpStatusCode.Unauthorized => new AuthenticationException("Login failure."),
                System.Net.HttpStatusCode.BadRequest => new ExternalServerException($"Invalid request details: {errorContent}"),
                _ => new ExternalServerException($"Internal Login service call failed with status code {httpResponse.StatusCode}: {errorContent}")
            };
        }
    }

    public class InternalUserLoginRequest
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}