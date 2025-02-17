using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace kisprojectv2.DTOs
{
    public class HorgaszottHalDTO
    {
        public string HorgaszNev { get; set; }
        public string HalNev { get; set; }
        public DateTime Datum { get; set; }
    }
}
