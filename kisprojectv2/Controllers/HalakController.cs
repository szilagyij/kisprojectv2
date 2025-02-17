using kisprojectv2.DTOs;
using kisprojectv2.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace kisprojectv2.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HalakController : ControllerBase
    {
        [HttpGet("/halak")]
        public IActionResult HalakGet()
        {
            try
            {
                using (var cx = new HalakContext())
                {
                    var halakDtos = cx.Halaks
                        .Select(f => new OsszesHalDTO
                        {
                            Nev = f.Nev, 
                            Tonev = f.To.Nev 
                        })
                        .ToList();

                    return Ok(halakDtos);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("/horgasz/{nev?}")]
        public IActionResult HorgaszHalak(string nev)
        {
                try
                {

                    using (var cx = new HalakContext())
                    {
                        var eredmeny = cx.Fogasoks
                            .Include(f => f.Horgasz)
                            .Include(f => f.Hal)
                            .AsQueryable();

                        if (!string.IsNullOrEmpty(nev) && cx.Horgaszoks.Any(f=>f.Nev==nev) )
                        {
                            eredmeny = eredmeny.Where(f => f.Horgasz.Nev == nev);
                        }
                        else
                        {
                            return BadRequest("Hibás név!");
                        }

                        var result = eredmeny
                            .Select(f => new HorgaszottHalDTO
                            {
                                HorgaszNev = f.Horgasz.Nev,
                                HalNev = f.Hal.Nev,
                                Datum = f.Datum
                            })
                            .ToList();

                        return Ok(result);
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
           
            
        }


        [HttpGet("harom-legnagyobb")]
        public IActionResult HaromLegnagyobb()
        {
            try
            {
                using (var cx = new HalakContext())
                {
                    var top3Halak = cx.Halaks
                        .OrderByDescending(f => f.MeretCm)
                        .Take(3)
                        .Select(f => new HaromLegnagyobbDTO
                        {
                            Id = f.Id,
                            Name = f.Nev,
                            MeretCm = f.MeretCm
                        })
                        .ToList();

                    return Ok(top3Halak);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




    }
}
