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
      query: `ALTER TABLE Clientes CHANGE sexo sexo_escrito
    VARCHAR(45);`,
    },
  ],
});

migracoes.set(3, {
  consultas: [
    {
      model: "Clientes",
      query: `ALTER TABLE Clientes DROP COLUMN sexo_escrito;`,
    },
  ],
});

export { migracoes };
