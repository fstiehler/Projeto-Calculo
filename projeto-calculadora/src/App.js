import React, { useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import CustoPorMl from "./components/CustoPorMl";
import CustoTotaldeGasto from "./components/CustoTotalDeGasto";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operator, setOperator] = useState("/");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const [pricePerMl, setPricePerMl] = useState("");
  const [usedMl, setUsedMl] = useState("");
  const [totalCost, setTotalCost] = useState(null);
  const [costError, setCostError] = useState("");
  const [listaResulados, setListaResulados] = useState([]);

  const handleCalculate = async () => {
    const num1Float = parseFloat(num1);
    const num2Float = parseFloat(num2);

    if (isNaN(num1Float) || isNaN(num2Float)) {
      setError("Por favor, insira números válidos.");
      setResult(null);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ num1: num1Float, num2: num2Float, operator }),
      });

      if (!response.ok) {
        throw new Error("Erro na solicitação ao servidor");
      }

      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setResult(null);
      } else {
        setResult(data.result);
        setError("");
      }
    } catch (error) {
      setError("Erro ao comunicar com o servidor");
      setResult(null);
    }
  };

  const handleCostCalculate = async () => {
    const pricePerMlFloat = parseFloat(pricePerMl);
    const usedMlFloat = parseFloat(usedMl);

    if (isNaN(pricePerMlFloat) || isNaN(usedMlFloat)) {
      setCostError("Por favor, insira números válidos.");
      setTotalCost(null);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          num1: pricePerMlFloat,
          num2: usedMlFloat,
          operator: "*",
        }),
      });

      if (!response.ok) {
        throw new Error("Erro na solicitação ao servidor");
      }

      const data = await response.json();
      if (data.error) {
        setCostError(data.error);
        setTotalCost(null);
      } else {
        setTotalCost(data.result);
        setCostError("");
        setListaResulados((resultadosAntigos) => [
          ...resultadosAntigos,
          data.result,
        ]);
      }
    } catch (error) {
      setCostError("Erro ao comunicar com o servidor");
      setTotalCost(null);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 15, mb: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Calculadora de Custos
        <br />
        <br />
      </Typography>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
        <CustoPorMl
          handleCalculate={handleCalculate}
          result={result}
          error={error}
          num1={num1}
          setNum1={setNum1}
          num2={num2}
          setNum2={setNum2}
          operator={operator}
          setOperator={setOperator}
        />
        <CustoTotaldeGasto
          handleCostCalculate={handleCostCalculate}
          totalCost={totalCost}
          costError={costError}
          pricePerMl={pricePerMl}
          setPricePerMl={setPricePerMl}
          usedMl={usedMl}
          setUsedMl={setUsedMl}
          listaResulados={listaResulados}
        />
      </Box>
    </Container>
  );
}

export default App;
