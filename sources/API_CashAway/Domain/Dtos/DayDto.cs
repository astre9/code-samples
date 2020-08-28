using System;

namespace Domain.Dtos
{
    public class DayDto
    {
        public double TotalIncome { get; set; }
        public int Count { get; set; }
        public double TotalExpenses { get; set; }
        public DateTime Date { get; set; }
        public int Day { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
    }
}