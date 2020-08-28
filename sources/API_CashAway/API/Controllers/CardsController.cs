using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Helpers;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Domain.Dtos;
using Domain;
using API.Interfaces;
using System.Linq;
using AutoMapper;
using API.Errors;
using System.Net;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;

        public CardsController(DataContext context, IUserAccessor userAccessor, IMapper mapper)
        {
            _mapper = mapper;
            _userAccessor = userAccessor;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<CardDto>>> List()
        {
            var username = _userAccessor.GetCurrentUsername();

            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);

            var cards = await _context.Cards
                .Include(x => x.Transactions)
                .Where(x => x.AppUserId == user.Id).ToListAsync();

            if (cards != null)
                return _mapper.Map<List<Card>, List<CardDto>>(cards);
            else
                return NotFound();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Card>> Details(Guid id)
        {
            var card = await _context.Cards.FindAsync(id);

            if (card != null)
                return card;
            else
                return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult> Create(Card card)
        {
            var username = _userAccessor.GetCurrentUsername();

            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);

            card.Id = Guid.NewGuid();
            card.ValidUntil = DateTime.Now.AddYears(5);
            card.CVC = RandomGenerator.RandomString(3);
            card.CardNumber = RandomGenerator.RandomString(12);
            card.AppUser = user;

            _context.Cards.Add(card);
            var success = await _context.SaveChangesAsync() > 0;

            if (success)
                return Ok("Card created!");
            else
                return BadRequest("Error saving");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var card = await _context.Cards.FindAsync(id);

            if (card == null)
            {
                throw new Exception("Card not found.");
            }
            _context.Remove(card);

            var success = await _context.SaveChangesAsync() > 0;

            if (success)
                return Ok();

            return NotFound();
        }
    }
}