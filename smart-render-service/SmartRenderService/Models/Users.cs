using System.Text.Json.Serialization;

public record User
{
    public int UserId { get; set; }
    public required string Name { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string TelephoneNo { get; set; }
    public required string Email { get; set; }
    public required string CompanyName { get; set; }
    public required string Address1 { get; set; }
    public required string City { get; set; }
    public required string State { get; set; }
    public required string PostalCode { get; set; }
    public required string Country { get; set; }
    public int UserType { get; set; }
    public int DealerId { get; set; }
    public int LicenseAccess { get; set; }
    [JsonPropertyName("accessToken")]
    public required string Access_Token { get; set; }
    [JsonPropertyName("refreshToken")]
    public required string Refresh_Token { get; set; }
    [JsonPropertyName("expiresIn")]
    public required string Expires_In { get; set; }
    public required Profile Profile { get; set; }
    public string? SessionId { get; set; }
    public string? AppCode { get; set; }
    public string? DealerCode { get; set; }
    public string? DtoType { get; set; }
}

public record Profile
{
    public int NumResultReturn { get; set; }
    public int DefaultPriceZone { get; set; }
}