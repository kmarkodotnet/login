using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Google.Apis.Auth;
using Login.Api.Model;
using Login.Logic;
using Login.Model;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Routing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Routing;

namespace Login.Api.Middlewares
{
    public class LoginTokenValidatorMiddleware
    {
        private readonly RequestDelegate _next;
        public LoginTokenValidatorMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var email = context.Request.Headers["Email"];
            var framework = context.Request.Headers["Framework"];

            if (string.IsNullOrEmpty(framework))
            {
                context.Response.StatusCode = 403;
                return;
            }

            var loginFramework = (LoginFramework)int.Parse(framework);

            switch (loginFramework)
            {
                case LoginFramework.Facebook:
                    var fmw = new FacebookTokenValidatorMiddleware(_next);
                    await fmw.InvokeAsync(context);
                    break;
                case LoginFramework.Google:
                    var gmw = new GoogleTokenValidatorMiddleware(_next);
                    await gmw.InvokeAsync(context);
                    break;
            }
        }
    }
}
