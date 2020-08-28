using System.Net;
using System.Threading.Tasks;
using API.Interfaces;
using API.Errors;
using Application.User;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using AutoMapper;
using System.Collections.Generic;
using Domain.Dtos;
using System.Linq;
using System.Threading;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IJwtGenerator _jwtGenerator;
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly ILogger<UsersController> _logger;

        public UsersController(DataContext context, ILogger<UsersController> logger, IUserAccessor userAccessor, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator)
        {
            this._logger = logger;
            _jwtGenerator = jwtGenerator;
            _signInManager = signInManager;
            _userManager = userManager;
            _userAccessor = userAccessor;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(User request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                throw new RestException(HttpStatusCode.Unauthorized);
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            Thread.Sleep(1500);
            
            if (result.Succeeded)
            {
                return new User()
                {
                    Username = user.UserName,
                    Password = null,
                    DisplayName = user.DisplayName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = null,
                    Token = _jwtGenerator.CreateToken(user),
                };
            }

            throw new RestException(HttpStatusCode.Unauthorized);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User request)
        {
            if (await _context.Users.AnyAsync(x => x.Email == request.Email))
            {
                throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already exists" });
            }

            var user = new AppUser
            {
                DisplayName = request.DisplayName,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                UserName = request.Username,
            };
            var result = await _userManager.CreateAsync(user, request.Password);

            if (result.Succeeded)
                return new User
                {
                    DisplayName = user.DisplayName,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Token = _jwtGenerator.CreateToken(user),
                };

            throw new Exception("Problem creating user.");
        }

        [HttpGet]
        public async Task<ActionResult<User>> CurrentUser()
        {
            var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

            return new User
            {
                Email = user.Email,
                AccountBalance = user.AccountBalance,
                Avatar = user.Avatar,
                Token = _jwtGenerator.CreateToken(user),
            };
        }

        [HttpPut]
        public async Task<ActionResult<User>> UpdateUserInfo(User request)
        {
            var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

            user.Email = request.Email;
            var isValid = true;
            foreach (var validator in _userManager.PasswordValidators)
            {
                var valid = (await validator.ValidateAsync(_userManager, user, request.Password)).Succeeded;
                isValid = valid;
            }

            if (isValid)
            {
                var newPassword = _userManager.PasswordHasher.HashPassword(user, request.Password);
                user.PasswordHash = newPassword;
            }
            else
            {
                throw new Exception("Password is invalid.");
            }


            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
                return new User
                {
                    Email = user.Email,
                    Token = _jwtGenerator.CreateToken(user),
                };

            throw new Exception("Problem updating user.");
        }

        [HttpGet("info")]
        public async Task<ActionResult<List<UserInfoDto>>> Info()
        {
            var currentUsername = _userAccessor.GetCurrentUsername();
            var users = await _context.Users
                .Where(x => x.UserName != currentUsername)
                .ToListAsync();
            var usersInfo = new List<UserInfoDto>();

            if (users != null)
            {
                foreach (var user in users)
                {
                    usersInfo.Add(new UserInfoDto { Email = user.Email, DisplayName = user.DisplayName, Avatar = user.Avatar });
                }
                return usersInfo;
            }
            else
                return NotFound();
        }


    }
}