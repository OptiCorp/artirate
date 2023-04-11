using System;
using System.Collections.Generic;

namespace ArtiRateAPI.Models;

public partial class Rating
{
    public int RatingValue { get; set; }

    public int ImgId { get; set; }

    public int UserId { get; set; }

    public virtual Image Img { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
