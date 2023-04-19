using System;
using System.Collections.Generic;

namespace ArtiRateAPI.Models;

public partial class Image
{
    public int ImgId { get; set; }

    public string ImgUrl { get; set; } = null!;

    public string ImgTitle { get; set; } = null!;

    public string? ImgDescription { get; set; }

    public string ImgPrompt { get; set; } = null!;

    public int? GeneratorId { get; set; }

    public virtual Generator? Generator { get; set; }
}
