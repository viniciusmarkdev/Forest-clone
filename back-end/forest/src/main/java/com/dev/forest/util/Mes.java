package com.dev.forest.util;

public enum Mes {
    JANEIRO(1), FEVEREIRO(2), MARÇO(3), ABRIL(4), MAIO(5), JUNHO(6),
    JULHO(7), AGOSTO(8), SETEMBRO(9), OUTUBRO(10), NOVEMBRO(11), DEZEMBRO(12);

    private final int numero;

    Mes(int numero) {
        this.numero = numero;
    }

    public String getNome() {
        switch (this) {
            case JANEIRO:
                return "Janeiro";
            case FEVEREIRO:
                return "Fevereiro";
            case MARÇO:
                return "Março";
            case ABRIL:
                return "Abril";
            case MAIO:
                return "Maio";
            case JUNHO:
                return "Junho";
            case JULHO:
                return "Julho";
            case AGOSTO:
                return "Agosto";
            case SETEMBRO:
                return "Setembro";
            case OUTUBRO:
                return "Outubro";
            case NOVEMBRO:
                return "Novembro";
            case DEZEMBRO:
                return "Dezembro";
            default:
                throw new IllegalArgumentException("Mês inválido");
        }
    }

    // Método estático para obter o nome do mês a partir do número
    public static String getNomeDoMes(int numero) {
        for (Mes mes : Mes.values()) {
            if (mes.numero == numero) {
                return mes.getNome();
            }
        }
        throw new IllegalArgumentException("Número de mês inválido: " + numero);
    }
}

