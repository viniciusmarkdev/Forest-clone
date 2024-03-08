package com.dev.forest.service;

import java.sql.Time;
import java.time.Duration;
import java.time.LocalTime;

import org.springframework.stereotype.Service;

import com.dev.forest.model.Arvore;

@Service
public class ArvoreServiceImpl implements ArvoreService{
	
	@Override
    public void calcularHoraTermino(Arvore arvore) {
		
        if (arvore.getHoraPlantio() != null && arvore.getTempoConcentracao() != null && !arvore.getTempoConcentracao().isEmpty()) {
        	
        
        	// Converter tempoConcentracao de String para int
			int minutosConcentracao = Integer.parseInt(arvore.getTempoConcentracao());

			// Obter horaPlantio como LocalTime
			/*
			 * O LocalTime é uma classe do pacote java.time introduzida no Java 8 que
			 * representa uma hora do dia, sem informações de fuso horário ou data. Por
			 * outro lado, o objeto Time é uma classe do pacote java.sql que representa um
			 * horário específico do dia, incluindo informações de data e hora.
			 */

			/*
			 * Chamamos  horaPlantio.toLocalTime() paara converter o objeto
			 * Time horaPlantio para um LocalTime, que contém apenas informações sobre a
			 * hora do dia (horas, minutos, segundos e nanossegundos) sem levar em
			 * consideração a data ou o fuso horário.
			 * 
			 * 
			 */
			LocalTime localHoraPlantio = arvore.getHoraPlantio().toLocalTime();

			// Adicionar minutosConcentracao à horaPlantio
			LocalTime localHoraTermino = localHoraPlantio.plusMinutes(minutosConcentracao);

			// Converter localHoraTermino para Time e atribuir a horaTermino
			arvore.setHoraTermino(Time.valueOf(localHoraTermino));
        }

}

	
	
	
	
}