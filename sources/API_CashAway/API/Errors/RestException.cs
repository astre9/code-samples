using System;
using System.Net;

namespace API.Errors
{
    public class RestException : Exception
    {
        public RestException(HttpStatusCode code, object errors = null)
        {
            Code = code;
        }
        public HttpStatusCode Code { get; }
        public object Errors { get; }
    }
}