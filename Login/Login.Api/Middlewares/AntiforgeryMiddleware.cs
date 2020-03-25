using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Login.Api.Model;
using Login.Logic;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;

namespace Login.Api.Middlewares
{
    public class AntiforgeryMiddleware
    {
        private readonly RequestDelegate _next;
        private IAntiforgery _antiforgery;
        public AntiforgeryMiddleware(RequestDelegate next, IAntiforgery antiforgery)
        {
            _next = next;
            _antiforgery = antiforgery;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var token = _antiforgery.GetAndStoreTokens(context);
            context.Response.Cookies.Append("XSRF-TOKEN", token.RequestToken, new CookieOptions { HttpOnly = false });

            await _next(context);
        }
    }
}
