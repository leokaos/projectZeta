package org.leo.projectzeta.controller;

import org.leo.projectzeta.api.SimpleFacade;
import org.leo.projectzeta.facade.UserFacade;
import org.leo.projectzeta.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/secured/user")
public class UserController extends AbstractSimpleController<User, String> {

	@Autowired
	private UserFacade facade;

	@Override
	protected SimpleFacade<User, String> getFacade() {
		return this.facade;
	}

}