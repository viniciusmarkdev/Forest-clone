package com.dev.forest.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.forest.model.Arvore;
import com.dev.forest.model.Usuario;
import com.dev.forest.repository.UsuarioRepository;

@Service
public class UsuarioCoinService {
	
	
	 
	
	 public int calcularTotalCoins(Usuario usuario) {
	      
	        
	        int totalCoins = usuario.getArvores().stream().mapToInt(Arvore::getCoins).sum();
	        
	        usuario.setAllCoins(totalCoins);
	        
	        return totalCoins;
	    }


}
