package com.dev.forest.model;

import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "tree")
public class Arvore {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String marcador;


	private String descricao;

	@Column(name = "running")
	private boolean running;

	@Column(name = "hora_de_plantio", columnDefinition = "TIME")
	private Time horaPlantio = new java.sql.Time(System.currentTimeMillis());

	@NotNull
	@Column(name = "tempo_de_concetracao_min")
	private String tempoConcentracao;

	@Column(name = "hora_de_termino" , columnDefinition = "TIME")
	private Time horaTermino;
	
	private  boolean estaMurcha = false;
	
	private int coins;
	
	private String nomeDoMes;
	
	
	
	
	
	
	public String getNomeDoMes() {
		return nomeDoMes;
	}

	public void setNomeDoMes(String nomeDoMes) {
		this.nomeDoMes = nomeDoMes;
	}

	@Temporal(TemporalType.TIMESTAMP)
	private Date data = new java.sql.Date(System.currentTimeMillis());

    @Transient
    @JsonIgnore
    private int diaCriacao;

	@Transient
    @JsonIgnore
    private int mesCriacao;
    
    
    
    public int getDiaCriacao() {
        return LocalDate.parse(data.toString()).getDayOfMonth();
    }

    public void setDiaCriacao(int diaCriacao) {
        this.diaCriacao = diaCriacao;
    }

    public int getMesCriacao() {
        return LocalDate.parse(data.toString()).getMonthValue();
    }

    public void setMesCriacao(int mesCriacao) {
        this.mesCriacao = mesCriacao;
    }

	
	

	
	

	

	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getMarcador() {
		return marcador;
	}

	public void setMarcador(String marcador) {
		this.marcador = marcador;
	}

	public boolean isRunning() {
		return running;
	}

	public void setRunning(boolean running) {
		this.running = running;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Time getHoraTermino() {
		return horaTermino;
	}

	public void setHoraTermino(Time horaTermino) {
		this.horaTermino = horaTermino;
	}

	




	public Time getHoraPlantio() {
		return horaPlantio;
	}

	public void setHoraPlantio(Time horaPlantio) {
		this.horaPlantio = horaPlantio;
	}

	public boolean isEstaMurcha() {
		return estaMurcha;
	}

	public void setEstaMurcha(boolean estaMurcha) {
		this.estaMurcha = estaMurcha;
	}

	public String getTempoConcentracao() {
		return tempoConcentracao;
	}

	public void setTempoConcentracao(String tempoConcentracao) {
		this.tempoConcentracao = tempoConcentracao;
	}

	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}


	
	
	



}