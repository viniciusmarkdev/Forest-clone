package com.dev.forest.controller;

import java.time.Duration;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.dev.forest.model.Arvore;
import com.dev.forest.repository.ArvoreRepository;
import com.dev.forest.service.ArvoreService;
import com.dev.forest.util.Mes;

@Controller
@RequestMapping("/arvore")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ArvoreController {
	
	
	@Autowired
	private ArvoreRepository arvoreRepository;
	
	
	@Autowired
	private ArvoreService arvoreService;
	
	
	
	@GetMapping
	public ResponseEntity<List<Arvore>> getAll(){
		
		return ResponseEntity.status(HttpStatus.OK).body(arvoreRepository.findAll());
	}
	
	@PostMapping("/plantar")
	public ResponseEntity<Arvore> create(@Valid @RequestBody Arvore arvore){
		
		   arvore.setId(0);
		   arvore.setHoraPlantio(new java.sql.Time(System.currentTimeMillis()));
		   arvore.setEstaMurcha(false);
		   arvore.setDiaCriacao(arvore.getDiaCriacao());
		   arvore.setMesCriacao(arvore.getMesCriacao());
		   arvore.setNomeDoMes(Mes.getNomeDoMes(arvore.getMesCriacao()));
		
		 arvoreService.calcularHoraTermino(arvore);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(arvoreRepository.save(arvore));
		
	
		
		
		
}
	
	@PutMapping("/{id}")

	public ResponseEntity<Arvore> atualizarSessao(@PathVariable Long id , @RequestBody Arvore arvore1){

		

	    Optional<Arvore> arvore  = arvoreRepository.findById(id);
		 
		Arvore arvore2 = arvore.get();
		
        arvore1.setHoraPlantio(arvore2.getHoraPlantio());
		arvore1.setHoraTermino(new java.sql.Time(System.currentTimeMillis()));

		LocalTime horaInicio = arvore2.getHoraPlantio().toLocalTime();

		LocalTime horaFim = arvore1.getHoraTermino().toLocalTime();
		
		long diferencaEmMinutos = horaInicio.until(horaFim, ChronoUnit.MINUTES);
		
		
		String diferencaEmMinutosString = String.valueOf(diferencaEmMinutos);
	
		
         arvore1.setTempoConcentracao(diferencaEmMinutosString);
		 arvore1.setId(id);
	     arvore1.setEstaMurcha(true);
	     arvore1.setDiaCriacao(arvore1.getDiaCriacao());
	     arvore1.setMesCriacao(arvore1.getMesCriacao());
	     arvore1.setNomeDoMes(Mes.getNomeDoMes(arvore1.getMesCriacao()));
		 
	

		if(arvore.isPresent()) {

			
	          
			arvoreService.calcularHoraTermino(arvore1);

			

			return ResponseEntity.status(HttpStatus.OK).body(arvoreRepository.save(arvore1));

		}

		else {

			

			return ResponseEntity.notFound().build();

			

		}

	 

	}
  
}
	




