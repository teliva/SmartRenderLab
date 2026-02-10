using System.ComponentModel.DataAnnotations;

public class AuthOptions
{
    public const string SectionName = "Authorization";

    [Required(AllowEmptyStrings = false)]
    public string UserName { get; set; } = string.Empty;
    
    [Required(AllowEmptyStrings = false)]
    public string Password { get; set; } = string.Empty;
}