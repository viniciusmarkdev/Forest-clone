package com.dev.forest.security;

import java.util.Collection;
import java.util.List;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.core.GrantedAuthority;


import com.dev.forest.model.Usuario;

public class UserDetailsImpl  implements UserDetails{
	
	private static final long serialVersionUID = 1L;
	
	private String email;
	
	private String senha;
	
	private List<GrantedAuthority> authorities;
	
	public UserDetailsImpl(Usuario usuario) {
		
		this.email = usuario.getEmail();
		this.senha = usuario.getSenha();
	}
	
	

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		return authorities;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return false;
	}
	
  
}
