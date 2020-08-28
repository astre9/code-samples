using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Helpers;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using API.Interfaces;
using System.Net;
using System.Linq;
using API.Errors;
using Domain.Dtos;
using AutoMapper;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;

        public TransactionsController(DataContext context, IUserAccessor userAccessor, IMapper mapper)
        {
            _mapper = mapper;
            _userAccessor = userAccessor;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<TransactionDto>>> List()
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

            if (user != null)
            {
                var transactions = await _context.Transactions
                    .Where(x => x.PayerName == user.Email || x.RecipientName == user.Email)
                    .ToListAsync();
                if (transactions != null)
                    return _mapper.Map<List<Transaction>, List<TransactionDto>>(transactions);
                else
                    throw new RestException(HttpStatusCode.NotFound, "No transactions found for user.");
            }
            else
                throw new RestException(HttpStatusCode.BadRequest, "Cannot access transactions.");
        }

        [HttpGet("stats")]
        public async Task<ActionResult<List<DayDto>>> Statistics()
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

            if (user != null)
            {
                var transactions = await _context.Transactions
                        .GroupBy(x => new { Year = x.Date.Year, Month = x.Date.Month, Day = x.Date.Day })
                        .Select(x => new DayDto
                        {
                            Count = x.Count(),
                            TotalExpenses = x.Sum(x => x.PayerName == user.Email ? x.Value : 0),
                            TotalIncome = x.Sum(x => x.RecipientName == user.Email ? x.Value : 0),
                            Day = x.Key.Day,
                            Month = x.Key.Month,
                            Year = x.Key.Year
                        })
                        .OrderBy(x => x.Day)
                        .ToListAsync();

                return transactions;
            }
            else
                throw new RestException(HttpStatusCode.BadRequest, "Cannot access stats.");
        }

        [HttpPost]
        public async Task<ActionResult> Create(Transaction transaction)
        {
            transaction.Id = Guid.NewGuid();
            var payer = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
            var recipient = await _context.Users.FirstOrDefaultAsync(x => x.Email == transaction.RecipientName);
            transaction.PayerName = payer.Email;
            transaction.Date = DateTime.Now;
            transaction.Payer = payer;
            transaction.Recipient = recipient;

            if (payer.AccountBalance >= -transaction.Value)
            {
                payer.AccountBalance += transaction.Value;
                recipient.AccountBalance -= transaction.Value;
            }
            else
            {
                throw new RestException(HttpStatusCode.BadRequest, "Value exceeds account balance.");
            }

            _context.Transactions.Add(transaction);
            var success = await _context.SaveChangesAsync() > 0;

            if (success)
                return Ok("Transaction added!");
            else
                return BadRequest("Error saving");
        }

    }
}