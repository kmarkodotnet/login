using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Google.Apis.Auth;
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
    public class GoogleTokenValidatorMiddleware
    {
        private readonly RequestDelegate _next;
        public GoogleTokenValidatorMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"];

            if (string.IsNullOrEmpty(token))
            {
                context.Response.StatusCode = 403;
                return;
            }

            var validPayload = await GoogleJsonWebSignature.ValidateAsync(token);
            var isValid = validPayload != null && validPayload.EmailVerified && validPayload.ExpirationTimeSeconds.HasValue && validPayload.ExpirationTimeSeconds.Value > 0;
            
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
