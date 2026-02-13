using System.ComponentModel.DataAnnotations;

public class AppOptions
{
    public const string SectionName = "App";

    [Required(AllowEmptyStrings = false)]
    public string KitsWebApiUrl { get; set; } = string.Empty;
}
