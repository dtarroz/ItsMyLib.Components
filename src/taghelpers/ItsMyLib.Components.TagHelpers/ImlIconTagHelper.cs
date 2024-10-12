using Microsoft.AspNetCore.Razor.TagHelpers;

namespace ItsMyLib.Components.TagHelpers;

public enum ImlIconName
{
    // ReSharper disable once InconsistentNaming
    arrow
}

[HtmlTargetElement("iml-icon")]
public class ImlIconTagHelper : TagHelper
{
    public ImlIconName Name { get; set; } = ImlIconName.arrow;

    public override void Process(TagHelperContext context, TagHelperOutput output) {
        output.Attributes.SetAttribute("name", Name.ToString());
    }
}
