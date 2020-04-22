using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Login.Api.Model;
using Login.Logic;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components.Routing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Routing;

namespace Login.Api.Middlewares
{
    public class FacebookTokenValidatorMiddleware
    {
        private readonly RequestDelegate _next;
        public FacebookTokenValidatorMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"];
            var isValid = await FacebookTokenHandler.IsValidToken(token);

            if (isValid)
            {
                await _next(context);
            }
            else
            {
                context.Response.StatusCode = 403;
            }
        }
    }
}
