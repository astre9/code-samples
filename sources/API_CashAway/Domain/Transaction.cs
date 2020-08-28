using System;

namespace Domain
{
    public class Transaction
    {
        public Guid Id { get; set; }
        public String RecipientName { get; set; }
        public String PayerName { get; set; }
        public double Value { get; set; }
        public DateTime Date { get; set; }
        public Guid CardId { get; set; }
        public string PayerId { get; set; }
        public string RecipientId { get; set; }
        public virtual AppUser Payer { get; set; }
        public virtual AppUser Recipient { get; set; }
        public virtual Card Card { get; set; }
    }
}