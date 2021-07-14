import React, { useMemo } from "react";

import { CustomTable } from "../CustomTable/CustomTable";
import { NumberRangeColumnFilter } from '../CustomTable/filters';

export const AdminHistory = ({ allHistory }) => {

  const columns = useMemo(() => [
    {
      Header: "Arbol (ID)",
      accessor: "NID",
      Filter: NumberRangeColumnFilter,
      filter: "between"
    },
    {
      Header: "ID Histórico",
      accessor: "ID_Historico",
      Filter: NumberRangeColumnFilter,
      filter: "between"
    },
    {
      Header: "Fecha de Baja",
      accessor: "fechaBaja",
    },
    {
      Header: "Reportado Por",
      accessor: "reportadoPor",
    },
    {
      Header: "Motivo",
      accessor: "motivoBaja",
    },
  ])

  return (
    <div>
      <CustomTable columns={columns} data={allHistory} />
    </div>
  )
}
