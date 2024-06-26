import React from "react";
import { Box, TextField, Button, MenuItem, Typography, Alert, Paper } from "@mui/material";

const CustoPorMl = ({ handleCalculate, result, error, num1, setNum1, num2, setNum2, operator, setOperator }) => {
  return (
    <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Cálculo para ml
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
          sx={{ mt: 2 }}
        >
          Calcular
        </Button>
      </Box>
      {result !== null && (
        <Typography variant="h6">Valor por ml: R$ {result}</Typography>
      )}
      {error && <Alert severity="error">{error}</Alert>}
    </Paper>
  );
};

export default CustoPorMl;
