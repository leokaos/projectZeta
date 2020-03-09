package org.leo.projectzeta.config.server;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;

import org.springframework.ldap.core.AttributesMapper;
import org.springframework.stereotype.Component;

import com.google.common.collect.Lists;

@Component
public class RoleAttributeMapper implements AttributesMapper<List<String>> {

	private static final String FORMAT_GROUP = "cn=([a-z,A-Z]*),.*";

	@Override
	public List<String> mapFromAttributes(Attributes attrs) throws NamingException {

		List<String> roles = Lists.newArrayList();

		Attribute attribute = attrs.get("memberOf");

		if (attribute != null) {

			NamingEnumeration<?> groups = attribute.getAll();

			while (groups.hasMoreElements()) {

				Matcher matcher = Pattern.compile(FORMAT_GROUP).matcher(groups.next().toString());

				if (matcher.matches()) {
					roles.add(matcher.group(1));
				}

			}
		}

		return roles;
	}

}
