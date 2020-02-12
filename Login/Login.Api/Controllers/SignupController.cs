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
    public class SignupController : ControllerBase
    {

        [HttpPost]
        public UserModel CreateUser([FromBody] UserModel userModel)
        {
            var us = new UserService();
            var u = us.CreateUser(userModel.Email, userModel.Password);
            return new UserModel { Email = u.Email};
        }
    }
}