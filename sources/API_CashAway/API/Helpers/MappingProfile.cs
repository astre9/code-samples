using System.Linq;
using AutoMapper;
using Domain.Dtos;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Card, CardDto>();
            CreateMap<Transaction, TransactionDto>();
        }
    }
}