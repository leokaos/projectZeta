package org.leo.projectzeta.config.server;

import java.text.MessageFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.naming.directory.SearchControls;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

@Component
public class RolesLdapTokenEnhancer implements TokenEnhancer {

	private static final String BASE_SEARCH = "ou=users";
	private static final String SEARCH_STRING = "cn={0}";

	@Autowired
	private LdapTemplate ldapTemplate;

	@Autowired
	private RoleAttributeMapper mapper;

	@Override
	public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {

		DefaultOAuth2AccessToken token = (DefaultOAuth2AccessToken) accessToken;

		token.setAdditionalInformation(getRolesFromUserName(authentication));

		return token;
	}

	private Map<String, Object> getRolesFromUserName(OAuth2Authentication authentication) {

		Map<String, Object> additionalInformation = new HashMap<>();

		String searchString = MessageFormat.format(SEARCH_STRING, authentication.getUserAuthentication().getName());

		List<List<String>> search = ldapTemplate.search(BASE_SEARCH, searchString, getDefaultControls(), mapper);

		additionalInformation.put("grupos", search.iterator().next());

		return additionalInformation;
	}

	private SearchControls getDefaultControls() {

		SearchControls controls = new SearchControls();

		controls.setSearchScope(SearchControls.SUBTREE_SCOPE);
		controls.setReturningObjFlag(true);
		controls.setReturningAttributes(new String[] { "memberOf", "userPassword", "cn" });

		return controls;
	}

}
