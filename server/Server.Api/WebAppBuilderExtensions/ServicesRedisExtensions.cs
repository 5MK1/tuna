using System.Net;
using Redis.OM;
using RedLockNet;
using RedLockNet.SERedis;
using RedLockNet.SERedis.Configuration;
using Server.Api.AppSettings;

namespace Server.Api.WebAppBuilderExtensions;

public static class ServicesRedisExtensions
{
	public static IServiceCollection AddRedis(this IServiceCollection services, RedisSettings redisCfg)
	{
		var redisConnectionProvider = new RedisConnectionProvider(
			new RedisConnectionConfiguration
			{
				Host = redisCfg.Host,
				Port = redisCfg.Port
			}
		);
		services.AddSingleton(redisConnectionProvider);

		var redLockFactory = RedLockFactory.Create(
			new List<RedLockEndPoint> { new DnsEndPoint(redisCfg.Host, redisCfg.Port) }
		);
		services.AddSingleton<IDistributedLockFactory>(redLockFactory);

		return services;
	}
}