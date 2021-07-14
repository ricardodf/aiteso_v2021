import React from "react"
import { useTable, useSortBy, useFilters, usePagination } from "react-table"
import { Table, Row, Col, Button, Input } from "reactstrap"
import { HiArrowDown, HiArrowUp } from "react-icons/hi";
import { BsChevronDoubleLeft, BsChevronLeft, BsChevronRight, BsChevronDoubleRight } from "react-icons/bs";
import { Filter, DefaultColumnFilter } from './filters'

export const CustomTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex }
  } = useTable({
    columns,
    data,
    defaultColumn: { Filter: DefaultColumnFilter },
    initialState: { pageIndex: 0, pageSize: 20 }
  }, useFilters, useSortBy, usePagination)

  const generateSortingIndicator = column => {
    return column.isSorted ? (column.isSortedDesc ? <HiArrowDown /> : <HiArrowUp />) : ""
  }
  
  const onChangeInInput = event => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0
    gotoPage(page)
  }

  return (
    <>
      <Table bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} >
                  <div>
                    <div {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    </div>
                    <Filter column={column} />
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
      <Row style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <div className="pagination">
          <Col md={3}>
            <Button
              color="success"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {<BsChevronDoubleLeft />}
            </Button>
            <Button
              color="success"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {<BsChevronLeft />}
            </Button>
          </Col>
          <Col md={2} style={{ marginTop: 7 }}>
            Pagina{" "}
            <strong>
              {pageIndex + 1} de {pageOptions.length}
            </strong>
          </Col>
          <Col md={2}>
            <Input
              type="number"
              min={1}
              style={{ width: 70 }}
              max={pageOptions.length}
              defaultValue={pageIndex + 1}
              onChange={onChangeInInput}
            />
          </Col>
          <Col md={3}>
            <Button color="success" onClick={nextPage} disabled={!canNextPage}>
              {<BsChevronRight />}
            </Button>
            <Button
              color="success"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {<BsChevronDoubleRight />}
            </Button>
          </Col>
        </div>
      </Row>
    </>
  )
}
