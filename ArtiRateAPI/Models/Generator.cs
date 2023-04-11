using System;
using System.Collections.Generic;

namespace ArtiRateAPI.Models;

public partial class Generator
{
    public int GeneratorId { get; set; }

    public string GeneratorName { get; set; } = null!;

    public string GeneratorUrl { get; set; } = null!;

    public virtual ICollection<Image> Images { get; } = new List<Image>();
}
