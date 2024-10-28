import React, { useState, useEffect } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import PropTypes from "prop-types";

import { Container, Services } from "./styles";
import "./style.css";



const pontosPorServico = {
  Retirada: 0.6,
  Suporte: 0.7,
  Instalação: 1,
  "Troca de Cômodo": 1,
  "Manutenção CTO": 1,
};


function Servicos({title, onChange, isDateSelect, reset}) {
  const [contar, setAdd] = useState(0);

  useEffect(() => {
    if (reset) {
      setAdd(0); // Reseta o contador para zero quando reset for true
    }
  }, [reset]);

  const add = () => {
    if(isDateSelect){
      setAdd(contar + 1);
      onChange(pontosPorServico[title]);
    }else{
      alert("Por favor, selecione uma data primeiro!");
    }
  }

  const remove = () => {
    if(isDateSelect && contar > 0){
      setAdd(contar - 1);
      onChange(-pontosPorServico[title]);
    }
  }

  return <div id="cor1">
            {title} ({contar})
            <div>
              <button type="button" onClick={add}>Aplicar</button>
              <button type="button" onClick={remove}>Remover</button>
            </div>
          </div>

}

Servicos.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isDateSelect: PropTypes.bool.isRequired,
  reset: PropTypes.bool.isRequired,
}


export default function Main() {

  const [selectedDate, setSelectedDate] = useState(null);
  const [pontosPorDia, setPontosPorDia] = useState({});
  const [totalPontosMes, setTotalPontosMes] = useState(0);
  const [resetCounters, setResetCounters] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setResetCounters((prev) => !prev); // Alterna o valor para acionar o reset nos serviços
  };

  const handlePontosChange = (pontos) => {
    if(selectedDate){
      const dataFormatada = selectedDate.toLocaleDateString("pt-BR");
      setPontosPorDia((prev) => {
        const totalDoDia = (prev[dataFormatada] || 0) + pontos;
        const novosPontosPorDia = { ...prev, [dataFormatada]: totalDoDia };
        return novosPontosPorDia;
      })

      setTotalPontosMes((prev) => prev + pontos);
    }
  }

  return (
    <Container>
      <header>
        <h1 id="comi">Comissões:</h1>
      </header>

      <div id="all">
        <div id="data">
          <div>
            <h2 id="selD">Selecione a Data:</h2>
          </div>

          <div>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange} // Atualiza a data selecionada
              dateFormat="dd/MM/yyyy" // Formato da data
            />
          </div>
        </div>


        <div>
          <Services>
            <h2>Serviços:</h2>

            <Servicos title="Retirada" onChange={handlePontosChange} isDateSelect={!!selectedDate} reset={resetCounters}/>
            <Servicos title="Suporte" onChange={handlePontosChange} isDateSelect={!!selectedDate} reset={resetCounters}/>
            <Servicos title="Instalação" onChange={handlePontosChange} isDateSelect={!!selectedDate} reset={resetCounters}/>
            <Servicos title="Troca de Cômodo" onChange={handlePontosChange} isDateSelect={!!selectedDate} reset={resetCounters}/>
            <Servicos title="Manutenção CTO" onChange={handlePontosChange} isDateSelect={!!selectedDate} reset={resetCounters}/>



            <div id="totalDia">
            <h4>
              Total do Dia: {pontosPorDia[selectedDate?.toLocaleDateString("pt-BR")]?.toFixed(2) || 0} pontos
            </h4>
            </div>

            <div id="totalMes">
              <h4>Total do mês: {totalPontosMes.toFixed(2)} pontos</h4>
            </div>

          </Services>

        </div>
      </div>
    </Container>
  );
}
