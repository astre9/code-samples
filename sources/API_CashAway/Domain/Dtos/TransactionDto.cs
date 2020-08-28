using System;

namespace Domain.Dtos
{
    public class TransactionDto
    {
        public Guid Id { get; set; }
        public String RecipientName { get; set; }
        public String PayerName { get; set; }
        public double Value { get; set; }
        public DateTime Date { get; set; }
        public Guid CardId { get; set; }
    }
}