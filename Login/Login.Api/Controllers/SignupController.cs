using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Login.Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Login.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignupController : ControllerBase
    {

        [HttpPost]
        public User CreateUser([FromBody] User u)
        {
            return new User { Email = u.Email, Password = u.Password };
        }
    }
}