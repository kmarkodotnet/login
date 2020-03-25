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
    public class SignupController : LoginBaseController
    {

        [HttpPost]
        public UserModel CreateUser([FromBody] UserModel userModel)
        {
            var us = new UserService();
            var u = us.CreateUser(userModel.Email, userModel.Password);
            var um = new UserModel { Email = u.Email, Id = u.Id };

            string sessionToken = CreateSessionToken(u.Id);

            Response.Cookies.Append("SESSIONID",sessionToken, new CookieOptions() {HttpOnly= true, IsEssential = true, Secure = true});
            
            return um;
        }

        private string CreateSessionToken(int uId)
        {
            var token =  JwtManager.CreateSessionToken(uId);
            return token;
        }

    }
}