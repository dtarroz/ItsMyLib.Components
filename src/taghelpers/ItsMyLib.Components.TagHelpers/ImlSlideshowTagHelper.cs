using Microsoft.AspNetCore.Razor.TagHelpers;

namespace ItsMyLib.Components.TagHelpers;

public enum ImlSlideshowMode
{
    // ReSharper disable once InconsistentNaming
    hover,

    // ReSharper disable once InconsistentNaming
    autoplay
}

public enum ImlSlideshowStatus
{
    // ReSharper disable once InconsistentNaming
    active,

    // ReSharper disable once InconsistentNaming
    inactive
}

[HtmlTargetElement("iml-slideshow")]
public class ImlSlideshowTagHelper : TagHelper
{
    public ImlSlideshowMode Mode { get; set; } = ImlSlideshowMode.hover;
    public ImlSlideshowStatus Status { get; set; } = ImlSlideshowStatus.active;
    public string? InactiveImageUrl { get; set; } = null;
    public List<string>? ImageUrls { get; set; } = null;

    public override void Process(TagHelperContext context, TagHelperOutput output) {
        output.Attributes.SetAttribute("mode", Mode.ToString());
        output.Attributes.SetAttribute("status", Status.ToString());
        if (!string.IsNullOrEmpty(InactiveImageUrl))
            output.Attributes.SetAttribute("inactive-image-url", InactiveImageUrl);
        if ((ImageUrls?.Count ?? 0) > 0)
            output.Attributes.SetAttribute("image-urls", ImageUrls);
    }
}
