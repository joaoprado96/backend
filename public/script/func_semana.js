function ObterDiaSemana() {
    let hoje = new Date();
    let diasDaSemana = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sabado"];
    diaDaSemanaGlobal = diasDaSemana[hoje.getDay()];
}