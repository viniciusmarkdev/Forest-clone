package com.dev.forest.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "tb_usuarios")
public class Usuario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	/*
	 * Apenas verifica se o valor não é nulo. Não se preocupa se o atributo é vazio ("") ou contém apenas espaços em branco.
	 */
	@NotNull(message="O campo do nome é obrigatório!")
	private String nome ;
	
	/*
	 * Garante que o valor não seja null e que contenha caracteres visíveis, ou seja,
	 *  que não seja vazio ou composto apenas por espaços em branco.	
	 */
	@NotBlank(message="O atributo da senha é obrigatório!")
	@Size(min=8 , message= "A senha deve ter  no mínimo 8 caracteres")
	private String senha;
	
	@NotNull(message = "O atributo Usuário é Obrigatório!")
	@Email(message = "O atributo Usuário deve ser um email válido!")
    private String email;
	
	
	private String foto;
	
	private String tipo;

	@OneToMany(mappedBy = "usuario", cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties("usuario")
	private List<Arvore> arvore;
	
	
	

	public Usuario(Long id, @NotNull(message = "O campo do nome é obrigatório!") String nome,
			@NotBlank(message = "O atributo da senha é obrigatório!") @Size(min = 8, message = "A senha deve ter  no mínimo 8 caracteres") String senha,
			@NotNull(message = "O atributo Usuário é Obrigatório!") @Email(message = "O atributo Usuário deve ser um email válido!") String email,
			String foto, String tipo, List<Arvore> arvore) {
		super();
		this.id = id;
		this.nome = nome;
		this.senha = senha;
		this.email= email;
		this.foto = foto;
		this.tipo = tipo;
		this.arvore = arvore;
	}
	
	

	public Usuario() {
		
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	




	public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}



	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public List<Arvore> getArvore() {
		return arvore;
	}

	public void setArvore(List<Arvore> arvore) {
		this.arvore = arvore;
	}
	
	
	
	

}
