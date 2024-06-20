using Microsoft.EntityFrameworkCore;
using PatientRegisterAPI.Models;

namespace PatientRegisterAPI.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Patient> Patients { get; set; }
    }
}
