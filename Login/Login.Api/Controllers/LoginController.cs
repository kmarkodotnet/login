using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Login.Api.Model;
using Login.Logic;
using Login.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace Login.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        [HttpPost]
        public UserModel Login([FromBody] UserModel userModel)
        {
            var c = Request.Cookies["SESSIONID"];

            var us = new UserService();

            var user = us.GetUser(userModel.Email);

            if (user == null)
            {
                throw new NotImplementedException();
            }
            else
            {
                var isValid = us.ValidatePassword(userModel.Email, userModel.Password);
                if (isValid)
                {
                    var um = new UserModel { Email = user.Email, Id = user.Id };

                    var sessionId = CreateSessionId(user.Id);
                    //SessionStore.CreateSession(sessionId, um);

                    Response.Cookies.Append("SESSIONID", sessionId, new CookieOptions() { HttpOnly = true, IsEssential = true, Secure = true });
                    return um;
                }
                else
                {
                    throw new NotImplementedException();
                }
                
            }
        }


        private string CreateSessionId(int uId)
        {
            var token = JwtManager.GetToken(uId);
            return token;
        }
    }
}