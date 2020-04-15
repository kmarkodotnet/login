using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;
using Login.Logic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Login.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserInfoController : ControllerBase
    {
        [Authorize]
        [HttpPut]
        public string Get()
        {
            var token = Request.Headers["Authorization"];

            var identity = this.User.Identity;
            var cs = (identity as ClaimsIdentity).Claims;

            var email = cs.First(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress").Value;
            var id = cs.First(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;

            var us = new UserService();
            var user = us.GetUser(email);
            if (user == null)
            {
                user = us.CreateUser(email, id);
            }
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            };
            return JsonSerializer.Serialize(user, options);
        }
    }
}