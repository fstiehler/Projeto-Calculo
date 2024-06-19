import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Alert,
} from "@mui/material";

function App() {
  // State for first calculation
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operator, setOperator] = useState("/");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // State for second calculation
  const [pricePerMl, setPricePerMl] = useState("");
  const [usedMl, setUsedMl] = useState("");
  const [totalCost, setTotalCost] = useState(null);
  const [costError, setCostError] = useState("");

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
      }
    } catch (error) {
      setCostError("Erro ao comunicar com o servidor");
      setTotalCost(null);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Calculo para ml
        </Typography>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Valor pago no Produto"
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="Operador"
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="/">Preço por ml do Produto</MenuItem>
          </TextField>
          <TextField
            label="Quantidade de ml no Produto"
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCalculate}
            fullWidth
          >
            Calcular
          </Button>
        </Box>
        {result !== null && (
          <Typography variant="h6">Valor por ml: R$ {result}</Typography>
        )}
        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Calculo de Gasto
        </Typography>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Preço de 1 ml"
            type="number"
            value={pricePerMl}
            onChange={(e) => setPricePerMl(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="Operador"
            value={"*"}
            fullWidth
            margin="normal"
            disabled
          >
            <MenuItem value="*">Preço de quanto gastou em Produto</MenuItem>
          </TextField>
          <TextField
            label="Quantidade de ml que você usou"
            type="number"
            value={usedMl}
            onChange={(e) => setUsedMl(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCostCalculate}
            fullWidth
          >
            Calcular
          </Button>
        </Box>
        {totalCost !== null && (
          <Typography variant="h6">Total Gasto: R$ {totalCost}</Typography>
        )}
        {costError && <Alert severity="error">{costError}</Alert>}
      </Box>
    </Container>
  );
}

export default App;
