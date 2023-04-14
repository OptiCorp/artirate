using System;
using System.Collections.Generic;

namespace ArtiRateAPI.Models;

public partial class User
{
    public string UserId { get; set; } = null!;

    public string Username { get; set; } = null!;

    public string Role { get; set; } = null!;

    public virtual ICollection<Rating> Ratings { get; } = new List<Rating>();
}
