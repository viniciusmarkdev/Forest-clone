package com.dev.forest.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.dev.forest.model.Arvore;
import com.dev.forest.repository.ArvoreRepository;
import com.dev.forest.service.ArvoreService;

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
		
		 arvoreService.calcularHoraTermino(arvore);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(arvoreRepository.save(arvore));
		
	
		
		
		
}
	
	
		@PutMapping("/{id}")
		public ResponseEntity<Arvore> atualizarSessao(@PathVariable Long id , @RequestBody Arvore arvore1){
			
			 Optional<Arvore> arvore  = arvoreRepository.findById(id);
			 arvore1.setId(id);
			 arvore1.setHoraPlantio(new java.sql.Time(System.currentTimeMillis()));
			
			if(arvore.isPresent()) {
				
				arvoreService.calcularHoraTermino(arvore1);
				
				return ResponseEntity.status(HttpStatus.OK).body(arvoreRepository.save(arvore1));
			}
			else {
				
				return ResponseEntity.notFound().build();
				
			}
		 
		}
	
	@DeleteMapping("/{id}")
	public  ResponseEntity<?> deletePostagem(@PathVariable Long id){
		
		return arvoreRepository.findById(id)
				.map(resposta->{
				         arvoreRepository.deleteById(id);
				         return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
				})
				.orElse(ResponseEntity.notFound().build());
		
		
	}
	
	



}