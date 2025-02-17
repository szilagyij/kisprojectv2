using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace kisprojectv2.Models;

public partial class Fogasok
{
    public int Id { get; set; }

    public int HalId { get; set; }

    public int HorgaszId { get; set; }

    public DateTime Datum { get; set; }
    [JsonIgnore]
    public virtual Halak Hal { get; set; } = null!;
    [JsonIgnore]
    public virtual Horgaszok Horgasz { get; set; } = null!;
}
