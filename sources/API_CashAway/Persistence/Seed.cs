using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static string RandomString(int length)
        {
            Random random = new Random();
            const string chars = "0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>{
                    new AppUser{
                        DisplayName = "Radu Bogdan",
                        FirstName = "Bogdan",
                        LastName = "Radu",
                        UserName="radu",
                        AccountBalance=10000,
                        Avatar="radu_bogdan98_avataaar",
                        Email="radu_bogdan98@gmail.com"
                    },
                     new AppUser{
                        DisplayName = "Popescu Alexandru",
                        FirstName = "Alexandru",
                        LastName = "Popescu",
                        UserName="alex",
                        AccountBalance=10000,
                        Avatar="pop_alex98_avataaar",
                        Email="pop_alex98@gmail.com"
                    },
                     new AppUser{
                        DisplayName = "Petrescu Valentina",
                        FirstName = "Valentina",
                        LastName = "Petrescu",
                        UserName="vali",
                        AccountBalance=10000,
                        Avatar="pe_vali98_avataaar",
                        Email="pe_vali98@gmail.com"
                    },
                     new AppUser{
                        DisplayName = "Florescu Mihai",
                        FirstName = "Mihai",
                        LastName = "Florescu",
                        UserName="mih98",
                        AccountBalance=10000,
                        Avatar="mihai_97_avataaar",
                        Email="mihai_97@gmail.com"
                    },
                     new AppUser{
                        DisplayName = "Filip Valeriu",
                        FirstName = "Valeriu",
                        LastName = "Filip",
                        UserName="vali78",
                        AccountBalance=10000,
                        Avatar="vali78_avataaar",
                        Email="vali78@gmail.com"
                    },
                     new AppUser{
                        DisplayName = "Florin Maria",
                        FirstName = "Maria",
                        LastName = "Florin",
                        UserName="floma",
                        AccountBalance=10000,
                        Avatar="maria_flo_avataaar",
                        Email="maria_flo@gmail.com"
                    }
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var cards = new List<Card>{
                    new Card{
                        Id=Guid.NewGuid(),
                        Bank="Revolut",
                        CardNumber=RandomString(12),
                        Pin=RandomString(6),
                        OwnerName=users[0].DisplayName,
                        ValidUntil=DateTime.Now.AddYears(5).ToLocalTime(),
                        CVC= RandomString(3),
                        Balance=10000,
                        Type="Virtual",
                        AppUser=users[0],
                    },
                    new Card{
                        Id=Guid.NewGuid(),
                        Bank="Revolut",
                        CardNumber=RandomString(12),
                        Pin=RandomString(6),
                        OwnerName=users[0].DisplayName,
                        Balance=10000,
                        ValidUntil=DateTime.Now.AddYears(5),
                        CVC= RandomString(3),
                        Type="Virtual",
                        AppUser=users[0],
                    }
                };
                foreach (var card in cards)
                {
                    context.Cards.Add(card);
                }

                var transactions = new List<Transaction>{
                    new Transaction{
                        Card=cards[0],
                        Id=Guid.NewGuid(),
                        Date=DateTime.Now,
                        PayerName=users[0].Email,
                        RecipientName="Burger King",
                        Payer=users[0],
                        Value=-125.60
                    },
                    new Transaction{
                        Card=cards[0],
                        Id=Guid.NewGuid(),
                        Date=DateTime.Now.AddDays(-6).AddHours(7).AddMinutes(53),
                        PayerName=users[0].Email,
                        Payer=users[0],
                        RecipientName="Netflix",
                        Value=-49.90
                    },
                    new Transaction{
                        Card=cards[0],
                        Id=Guid.NewGuid(),
                        Date=DateTime.Now.AddDays(-5).AddHours(2).AddMinutes(34),
                        PayerName=users[0].Email,
                        Payer=users[0],
                        RecipientName="Pizza Hut",
                        Value=-275.90
                    },
                    new Transaction{
                        Card=cards[0],
                        Id=Guid.NewGuid(),
                        Date=DateTime.Now.AddDays(-4).AddHours(-3).AddMinutes(-10),
                        PayerName=users[0].Email,
                        Payer=users[0],
                        RecipientName="Starbucks",
                        Value=-55.44
                    },
                    new Transaction{
                        Card=cards[0],
                        Payer=users[0],
                        Id=Guid.NewGuid(),
                        Date=DateTime.Now.AddDays(-3).AddHours(4).AddMinutes(10),
                        PayerName="Work",
                        RecipientName=users[0].Email,
                        Value=1500
                    },
                    new Transaction{
                        Card=cards[0],
                        Payer=users[0],
                        Id=Guid.NewGuid(),
                        Date=DateTime.Now.AddDays(-2).AddHours(-6).AddMinutes(-15),
                        PayerName=users[0].Email,
                        RecipientName="Pizza Hut",
                        Value=-145
                    },
                    new Transaction{
                        Card=cards[0],
                        Payer=users[0],
                        Id=Guid.NewGuid(),
                        Date=DateTime.Now.AddDays(-1).AddHours(-2).AddMinutes(-50),
                        PayerName=users[0].Email,
                        RecipientName="Starbucks",
                        Value=-112
                    }
                };

                foreach (var transaction in transactions)
                {
                    context.Transactions.Add(transaction);
                }

                await context.SaveChangesAsync();
            }
        }
    }
}