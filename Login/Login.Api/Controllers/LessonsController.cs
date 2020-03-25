using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Login.DataAccess;
using Microsoft.AspNetCore.Authorization;

namespace Login.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonsController : LoginBaseController
    {
        //[Authorize]
        [HttpGet]
        public string Get()
        {
            var sessionId = Request.Cookies["SESSIONID"];

            //itt elérhető a userId ami a jwt tokenből jön
            var userId = this.User.Identity.Name;

            if (string.IsNullOrWhiteSpace(sessionId))
            {
                Response.StatusCode = 203;
                return null; }
            else
            {
                var dc = new DataContext();
                var lessons = dc.Lessons.List();
                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                    WriteIndented = true
                };
                return JsonSerializer.Serialize(lessons, options);
            }
        }
    }
}