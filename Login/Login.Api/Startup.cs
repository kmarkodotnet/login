using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Login.Api.Middlewares;
using Login.Api.Model;
using Login.DataAccess;
using Login.Logic;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Login.Api
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddAntiforgery(options =>
            {
                options.HeaderName = "XSRF-TOKEN";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IAntiforgery antiforgery)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            //https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware/write?view=aspnetcore-3.1
            app.UseRetrieveUserIdFromRequest();

            app.UseWhen(c => 
                    c.Request.Path.StartsWithSegments("/api/lessons"), appbuilder => 
                appbuilder.UseCheckIfAuthenticatedRequest()
            );

            app.UseAntiforgeryRequest(antiforgery);


            //some better solutions:
            //https://www.c-sharpcorner.com/article/asp-net-web-api-2-creating-and-validating-jwt-json-web-token/
            //https://www.c-sharpcorner.com/article/jwt-json-web-token-authentication-in-asp-net-core/

            app.UseRouting();
            app.UseCors(builder =>
                {
                    builder
                    .WithOrigins("https://localhost:4200", "http://localhost:4200", "http://localhost:4200/signup")
                    //.AllowAnyOrigin()
                    .AllowAnyHeader().AllowAnyMethod()
                    .AllowCredentials()
                    ;
                }
            );

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseAuthentication();


            DataContext.Init();
        }
    }
}
