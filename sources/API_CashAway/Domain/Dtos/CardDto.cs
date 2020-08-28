using System;
using System.Collections.Generic;

namespace Domain.Dtos
{
    public class CardDto
    {
        public Guid Id { get; set; }
        public string CardNumber { get; set; }
        public string Bank { get; set; }
        public string OwnerName { get; set; }
        public string Type { get; set; }
        public string Pin { get; set; }
        public string CVC { get; set; }
        public DateTime ValidUntil { get; set; }
        public string AppUserId { get; set; }
        public ICollection<TransactionDto> Transactions { get; set; }
    }
}