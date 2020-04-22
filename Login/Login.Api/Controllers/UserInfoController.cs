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
        [HttpPut]
        public string Get()
        {
            var accessToken = Request.Headers["Authorization"];
            var email = Request.Headers["Email"];

            var id = FacebookTokenHandler.GetUserIdByAccessToken(accessToken);

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