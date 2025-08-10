	package com.dev.forest.model;
	
	import java.sql.Time;
	import java.time.LocalDate;
	import java.time.ZoneId;
	import java.util.Date;
	
	import javax.persistence.Column;
	import javax.persistence.Entity;
	import javax.persistence.GeneratedValue;
	import javax.persistence.GenerationType;
	import javax.persistence.Id;
	import javax.persistence.ManyToOne;
	import javax.persistence.Table;
	import javax.persistence.Temporal;
	import javax.persistence.TemporalType;
	import javax.validation.constraints.NotNull;
	
	import org.springframework.data.annotation.Transient;
	
	import com.fasterxml.jackson.annotation.JsonFormat;
	import com.fasterxml.jackson.annotation.JsonIgnore;
	import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
	
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
	
	    @Column(name = "hora_de_termino", columnDefinition = "TIME")
	    private Time horaTermino;
	
	    private boolean estaMurcha = false;
	
	    private int coins;
	
	    private String nomeDoMes;
	    
	    private  String tipoDaArvore;
	
	    @ManyToOne
	    @JsonIgnoreProperties("arvores") 
	    private Usuario usuario;
	
	    @Temporal(TemporalType.TIMESTAMP)
	    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	    private Date data = new Date();
	    
	    
	    
	    
	
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
	
		public String getDescricao() {
			return descricao;
		}
	
		public void setDescricao(String descricao) {
			this.descricao = descricao;
		}
	
		public boolean isRunning() {
			return running;
		}
	
		public void setRunning(boolean running) {
			this.running = running;
		}
	
		public boolean isEstaMurcha() {
			return estaMurcha;
		}
	
		public void setEstaMurcha(boolean estaMurcha) {
			this.estaMurcha = estaMurcha;
		}
	
		public int getCoins() {
			return coins;
		}
	
		public void setCoins(int coins) {
			this.coins = coins;
		}
	
		public String getNomeDoMes() {
			return nomeDoMes;
		}
	
		public void setNomeDoMes(String nomeDoMes) {
			this.nomeDoMes = nomeDoMes;
		}
	
		public Usuario getUsuario() {
			return usuario;
		}
	
		public void setUsuario(Usuario usuario) {
			this.usuario = usuario;
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
	
		public String getTempoConcentracao() {
			return tempoConcentracao;
		}
	
		public void setTempoConcentracao(String tempoConcentracao) {
			this.tempoConcentracao = tempoConcentracao;
		}
		
		
	
		public String getTipoDaArvore() {
			return tipoDaArvore;
		}

		public void setTipoDaArvore(String tipoDaArvore) {
			this.tipoDaArvore = tipoDaArvore;
		}



		@Transient
	    @JsonIgnore
	    private int diaCriacao;
	
	    @Transient
	    @JsonIgnore
	    private int mesCriacao;
	
	    public Arvore() {
	    }
	
	    // Getters e Setters (mantidos os mesmos, exceto pelos ajustes abaixo)
	
	    public Date getData() {
	        return data;
	    }
	
	    public void setData(Date data) {
	        this.data = data;
	    }
	
	    public int getDiaCriacao() {
	        return LocalDate.ofInstant(data.toInstant(), ZoneId.systemDefault()).getDayOfMonth();
	    }
	
	    public void setDiaCriacao(int diaCriacao) {
	        this.diaCriacao = diaCriacao;
	    }
	
	    public int getMesCriacao() {
	        return LocalDate.ofInstant(data.toInstant(), ZoneId.systemDefault()).getMonthValue();
	    }
	
	    public void setMesCriacao(int mesCriacao) {
	        this.mesCriacao = mesCriacao;
	    }
	
	   
	}