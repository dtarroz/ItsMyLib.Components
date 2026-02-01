using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace ItsMyLib.Components.TagHelpers;

public enum ImlDialogSize
{
    // ReSharper disable once InconsistentNaming
    xSmall,

    // ReSharper disable once InconsistentNaming
    small,

    // ReSharper disable once InconsistentNaming
    large,
}

[HtmlTargetElement("iml-dialog")]
public class ImlDialogTagHelper : TagHelper
{
    public string? HeaderTitle { get; set; } = null;
    public bool CloseButton { get; set; } = true;
    public ImlDialogSize Size { get; set; } = ImlDialogSize.small;

    public override void Process(TagHelperContext context, TagHelperOutput output) {
        if (!string.IsNullOrEmpty(HeaderTitle))
            output.Attributes.SetAttribute("header-title", HeaderTitle);
        output.Attributes.SetAttribute("close-button", CloseButton.ToString().ToLower());
        output.Attributes.SetAttribute("size", ToKebabCase(Size.ToString()));
    }

    private static string ToKebabCase(string text) {
        return Regex.Replace(text, "([a-z])([A-Z])", "$1-$2").ToLower();
    }
}
