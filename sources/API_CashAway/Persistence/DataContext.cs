using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Card> Cards { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            builder.Entity<Card>()
            .HasOne(a => a.AppUser)
            .WithMany(t => t.Cards)
            .HasForeignKey(u => u.AppUserId);

            builder.Entity<Transaction>()
            .HasOne(c => c.Card)
            .WithMany(t => t.Transactions)
            .HasForeignKey(c => c.CardId);
        }
    }
}
