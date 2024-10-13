using Microsoft.AspNetCore.Razor.TagHelpers;

namespace ItsMyLib.Components.TagHelpers;

public enum ImlIconName
{
    // ReSharper disable once InconsistentNaming
    arrow,

    // ReSharper disable once InconsistentNaming
    search,

    // ReSharper disable once InconsistentNaming
    circlePlus,

    // ReSharper disable once InconsistentNaming
    filter
}

[HtmlTargetElement("iml-icon")]
public class ImlIconTagHelper : TagHelper
{
    public ImlIconName Name { get; set; } = ImlIconName.arrow;

    public override void Process(TagHelperContext context, TagHelperOutput output) {
        output.Attributes.SetAttribute("name", ToKebabCase(Name.ToString()));
    }

    private string ToKebabCase(string text) {
        return Regex.Replace(text, "([a-z])([A-Z])", "$1-$2").ToLower();
    }
}
