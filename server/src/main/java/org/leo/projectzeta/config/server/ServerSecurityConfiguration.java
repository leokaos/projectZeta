package org.leo.projectzeta.config.server;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.ldap.LdapAuthenticationProviderConfigurer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ServerSecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Value("${ldap.server}")
	private String ldapServer;

	@Value("${ldap.user}")
	private String user;

	@Value("${ldap.password}")
	private String managerPassword;

	@Value("${ldap.base}")
	private String baseUrl;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {

		String finalUrl = ldapServer + baseUrl;

		LdapAuthenticationProviderConfigurer<AuthenticationManagerBuilder> ldapAuthentication = auth.ldapAuthentication();

		ldapAuthentication.userDnPatterns("cn={0},ou=users").groupSearchBase("ou=users").contextSource().managerDn(user).managerPassword(managerPassword).url(finalUrl);
		ldapAuthentication.passwordCompare().passwordAttribute("userPassword");
	}

	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers(HttpMethod.OPTIONS);
	}

}
