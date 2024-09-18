using Microsoft.AspNetCore.Razor.TagHelpers;

namespace ItyMyLib.Components.TagHelpers;

public enum ImlButtonMode
{
    // ReSharper disable once InconsistentNaming
    primary,

    // ReSharper disable once InconsistentNaming
    secondary
}

public enum ImlButtonStatus
{
    // ReSharper disable once InconsistentNaming
    active,

    // ReSharper disable once InconsistentNaming
    inactive,

    // ReSharper disable once InconsistentNaming
    disabled
}

[HtmlTargetElement("iml-button")]
public class ImlButtonTagHelper : TagHelper
{
    public ImlButtonMode Mode { get; set; } = ImlButtonMode.primary;
    public ImlButtonStatus Status { get; set; } = ImlButtonStatus.active;
    public string? RedirectToUrl { get; set; } = null;

    public override void Process(TagHelperContext context, TagHelperOutput output) {
        output.Attributes.SetAttribute("mode", Mode.ToString());
        output.Attributes.SetAttribute("status", Status.ToString());
        if (!string.IsNullOrEmpty(RedirectToUrl))
            output.Attributes.SetAttribute("redirect-to-url", RedirectToUrl);
    }
}

