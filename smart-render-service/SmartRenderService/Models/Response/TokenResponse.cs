using System.Text.Json.Serialization;

public record TokenResponse
{
    [JsonPropertyName("accessToken")]
    public required string accessToken { get; set; }
}