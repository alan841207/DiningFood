using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(OrderingFoodSystem.Startup))]
namespace OrderingFoodSystem
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
