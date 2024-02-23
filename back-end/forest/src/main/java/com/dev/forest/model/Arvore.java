package com.dev.forest.model;

import java.sql.Time;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tree")
public class Arvore {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull(message = "O atributo Descrição deve ser obrigatório")
	private String marcador;

	@NotNull(message = "O atributo Descrição deve ser obrigatório")
	private String descricao;

	@Column(name = "running")
	private boolean running;

	@Column(name = "hora_de_plantio", columnDefinition = "TIME")
	private Time horaPlantio = new java.sql.Time(System.currentTimeMillis());

	@Column(name = "tempo_de_concetracao_min")
	private String tempoConcentracao;

	@Column(name = "hora_de_termino")
	private Time horaTermino;

	
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
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

	public String getTempoConcentracao() {
		return tempoConcentracao;
	}


	public Time getHoraPlantio() {
		return horaPlantio;
	}



}