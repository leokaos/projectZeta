package org.leo.projectzeta.config.ldap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.core.support.LdapContextSource;

@Configuration
public class LdapConfiguration {

	@Value("${ldap.server}")
	private String ldapServer;

	@Bean
	public LdapContextSource contextSource() {

		LdapContextSource contextSource = new LdapContextSource();

		contextSource.setUrl(ldapServer);
		contextSource.setUserDn("cn=admin,dc=rh,dc=system,dc=org");
		contextSource.setBase("dc=rh,dc=system,dc=org");
		contextSource.setPassword("leo123");

		return contextSource;
	}

	@Bean
	public LdapTemplate ldapTemplate() {
		return new LdapTemplate(contextSource());
	}

}
