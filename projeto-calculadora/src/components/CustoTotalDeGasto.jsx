import React from "react";
import { Box, TextField, Button, MenuItem, Typography, Alert, Paper } from "@mui/material";

const CustoTotaldeGasto = ({ handleCostCalculate, totalCost, costError, pricePerMl, setPricePerMl, usedMl, setUsedMl, listaResulados }) => {
  const somaHistorico = listaResulados.reduce((acc, curr) => acc + curr, 0);

  return (
    <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Cálculo de Gasto
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
          sx={{ mt: 2 }}
        >
          Calcular
        </Button>
      </Box>
      {totalCost !== null && (
        <Typography variant="h6">Total Gasto: R$ {totalCost}</Typography>
      )}
      {costError && <Alert severity="error">{costError}</Alert>}

      <Typography variant="h5" component="h2" gutterBottom>
        Histórico ({listaResulados.length})
      </Typography>
      {listaResulados.map((result, index) => (
        <TextField
          key={index}
          label={`Resultado ${index + 1}`}
          type="number"
          value={result}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
      ))}
      <Typography variant="h6" component="div">
        Soma do Histórico: R$ {somaHistorico}
      </Typography>
    </Paper>
  );
};

export default CustoTotaldeGasto;
