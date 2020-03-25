using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Login.Api.Model;
using Login.Logic;
using Login.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Login.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : LoginBaseController
    {
        [HttpGet]
        public UserModel Get()
        {
            var sessionId = Request.Cookies["SESSIONID"];
            
            if (!string.IsNullOrWhiteSpace(sessionId) 
                )
            {
                var userId = JwtManager.DecodeUserIdFromToken(sessionId);
                var uid = int.Parse(userId);
                var us = new UserService();
                var user = us.GetUser(uid);
                return ToDto(user);
            }
            else
            {
                Response.StatusCode = 203;
                return null;
            }
        }

        private UserModel ToDto(User user)
        {
            return new UserModel
            {
                Email = user.Email,
                Id = user.Id
            };
        }
    }
}