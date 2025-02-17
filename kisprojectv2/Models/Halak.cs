using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace kisprojectv2.Models;

public partial class Halak
{
    public int Id { get; set; }

    public string Nev { get; set; } = null!;

    public string Faj { get; set; } = null!;

    public decimal MeretCm { get; set; }

    public int ToId { get; set; }

    public byte[] Kep { get; set; } = null!;
    [JsonIgnore]
    public virtual ICollection<Fogasok> Fogasoks { get; set; } = new List<Fogasok>();
    [JsonIgnore]
    public virtual Tavak To { get; set; } = null!;
}
