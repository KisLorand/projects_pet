using CC;
using CC.Infrastructure;
using CC.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITokenService, TokenService>();
//
builder.Services.AddHttpContextAccessor();

builder.Services.AddSwaggerGen(options => {
	options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
	{
		Description = "Standard Authorization header using the bearer scheme (\"bearer <token>\")", //  like bearer fcvzfubzzubcu
		In = ParameterLocation.Header,
		Name = "Authorization",
		Type = SecuritySchemeType.ApiKey
	});
	options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	.AddJwtBearer(options => {
		options.TokenValidationParameters = new TokenValidationParameters
		{
			ValidateIssuerSigningKey = true,
			IssuerSigningKey = new SymmetricSecurityKey(
				System.Text.Encoding.UTF8.GetBytes(
					builder.Configuration.GetSection("AppSettings:Token").Value)),
			ValidateIssuer = false,
			ValidateAudience = false
		};
	});


builder.Services.AddDbContext<ICCContext, CCContext>(options =>
{
	var server = builder.Configuration["DB_HOST"] ?? "localhost";
	var port = builder.Configuration["DB_PORT"] ?? "1433";
	var user = builder.Configuration["DB_USER"] ?? "SA";
	var password = builder.Configuration["DB_PASSWORD"] ?? "Pa55w0rd2023";
	var database = builder.Configuration["DATABASE"] ?? "CCommandContext";

	var connectionstring = $"Server={server},{port};Initial Catalog={database};User ID={user};Password={password};TrustServerCertificate=true";
	options.UseSqlServer(connectionstring);
});
// builder.Services.AddDbContext<ICCContext, CCContext>(options =>
// {
// 	var connectionstring = builder.Configuration.GetConnectionString("CCommandContext");
// 	options.UseSqlServer(connectionstring);
// });

builder.Services.AddTransient<CCSeed>();

var app = builder.Build();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var initialiser = services.GetRequiredService<CCSeed>();
initialiser.Seed();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}


app.UseCors(builder => builder
   .AllowAnyHeader()
   .AllowAnyMethod()
   .SetIsOriginAllowed((host) => true)
   .AllowCredentials());

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
