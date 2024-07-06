namespace Server.Api.AppSettings;

public class RedisSettings
{
	public const string SectionKey = "Redis";

	public const string HostKey = nameof(Host);

	public const string PortKey = nameof(Port);

	public string Host { get; set; } = string.Empty;

	public int Port { get; set; }

	public static RedisSettings ReadFrom(ConfigurationManager cfg)
	{
		var section = cfg.GetSection(SectionKey);
		return new RedisSettings
		{
			Host = section.GetSection(HostKey).Value ?? string.Empty,
			Port = int.Parse(section.GetSection(PortKey).Value ?? string.Empty)
		};
	}
}