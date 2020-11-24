using System;
using System.IO;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace Shared.Extensions
{
    public static class ServiceSwaggerConfigurationExtension
    {
        public static void ConfigureSwagger(this IApplicationBuilder application)
        {
            application.UseSwagger();
            application.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Porto");
                c.RoutePrefix = string.Empty;
            });

        }

        public static void ConfigureSwagger(this IServiceCollection service)
        {
            service.AddSwaggerGen(configure =>
            {
                configure.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "API Porto Cliente",
                    Description = "Acesso ao contexto de Serviço do Porto Cliente",

                });

                var xmlFile = "WebApi.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

                configure.IncludeXmlComments(xmlPath);
            });
        }
    }
}
