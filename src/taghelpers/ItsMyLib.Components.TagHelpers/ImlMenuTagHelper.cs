using System.Text.Json;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace ItsMyLib.Components.TagHelpers;

public class ImlMenuAction
{
    public string Name { get; set; }
    public string Caption { get; set; }
    public string Icon { get; set; }
}

[HtmlTargetElement("iml-menu")]
public class ImlMenuTagHelper : TagHelper
{
    public string? Icon { get; set; } = null;
    public List<ImlMenuAction>? Actions { get; set; } = null;

    public override void Process(TagHelperContext context, TagHelperOutput output) {
        if (!string.IsNullOrEmpty(Icon))
            output.Attributes.SetAttribute("icon", Icon);
        if ((Actions?.Count ?? 0) > 0)
            output.Attributes.SetAttribute("actions", JsonSerializer.Serialize(Actions, GetJsonSerializerOptions()));
    }

    private static JsonSerializerOptions GetJsonSerializerOptions() {
        return new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
    }
}
