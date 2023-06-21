export interface MigracaoDB {
  consultas?: Array<{ model: string; query: string }>;
}
const migracoes: Map<number, MigracaoDB> = new Map<number, MigracaoDB>();
migracoes.set(1, {
  consultas: [
    {
      model: "Clientes",
      query: `ALTER TABLE Clientes ADD sexo CHAR(1);`,
    },
  ],
});

migracoes.set(2, {
  consultas: [
    {
      model: "Clientes",
      query: `ALTER TABLE Clientes CHANGE sexo endereco
    VARCHAR(45);`,
    },
  ],
});
/*
migracoes.set(4, {
  consultas: [
    {
      model: "Dependentes",
      query: `ALTER TABLE Dependentes DROP COLUMN endereco;`,
    },
    {
      model: "Dependentes",
      query: `ALTER TABLE Dependentes DROP COLUMN atributo_adicionado_2;`,
    },
  ],
});
migracoes.set(5, {
  consultas: [
    {
      model: "Dependentes",
      query: `DROP TABLE Dependentes`,
    },
  ],
});*/
export { migracoes };
