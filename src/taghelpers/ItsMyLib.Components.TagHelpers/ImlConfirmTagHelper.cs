using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace ItsMyLib.Components.TagHelpers;

public enum ImlConfirmButtonMode
{
    // ReSharper disable once InconsistentNaming
    primary,

    // ReSharper disable once InconsistentNaming
    secondary
}

public enum ImlConfirmSize
{
    // ReSharper disable once InconsistentNaming
    xSmall,

    // ReSharper disable once InconsistentNaming
    small,

    // ReSharper disable once InconsistentNaming
    large,
}

[HtmlTargetElement("iml-confirm")]
public class ImlConfirmTagHelper : TagHelper
{
    public string ButtonYesCaption { get; set; } = "Oui";
    public ImlConfirmButtonMode ButtonYesMode { get; set; } = ImlConfirmButtonMode.primary;
    public string ButtonNoCaption { get; set; } = "Non";
    public ImlConfirmButtonMode ButtonNoMode { get; set; } = ImlConfirmButtonMode.secondary;
    public string? HeaderTitle { get; set; } = null;
    public ImlDialogSize Size { get; set; } = ImlDialogSize.small;

    public override void Process(TagHelperContext context, TagHelperOutput output) {
        output.Attributes.SetAttribute("button-yes-caption", ButtonYesCaption);
        output.Attributes.SetAttribute("button-yes-mode", ButtonYesMode.ToString());
        output.Attributes.SetAttribute("button-no-caption", ButtonNoCaption);
        output.Attributes.SetAttribute("button-no-mode", ButtonNoMode.ToString());
        if (!string.IsNullOrEmpty(HeaderTitle))
            output.Attributes.SetAttribute("header-title", HeaderTitle);
        output.Attributes.SetAttribute("size", ToKebabCase(Size.ToString()));
    }

    private static string ToKebabCase(string text) {
        return Regex.Replace(text, "([a-z])([A-Z])", "$1-$2").ToLower();
    }
}
