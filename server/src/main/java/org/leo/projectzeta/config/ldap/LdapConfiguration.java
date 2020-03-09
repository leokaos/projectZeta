package org.leo.projectzeta.config.ldap;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.core.support.LdapContextSource;

@Configuration
public class LdapConfiguration {

	@Bean
	public LdapContextSource contextSource() {

		LdapContextSource contextSource = new LdapContextSource();

		contextSource.setUrl("ldap://localhost:389");
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
