import React from "react"
import { Form } from "react-bootstrap"
import { CustomInput } from "reactstrap"

export const Filter = ({ column }) => {
  return (
    <div style={{ marginTop: 5 }}>
      {column.canFilter && column.render("Filter")}
    </div>
  )
}

export const DefaultColumnFilter = ({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  },
}) => {
  return (
    <Form>
      <Form.Group>
        <Form.Control
          value={filterValue || ""}
          onChange={e => {
            setFilter(e.target.value || undefined)
          }}
          placeholder={`...`}
        />
      </Form.Group>
    </Form>
  )
}

export const SelectColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) => { 
    const options = React.useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])

    return (
      <CustomInput
        id="custom-select"
        type="select"
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">All</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </CustomInput>
    )
  }

  export const NumberRangeColumnFilter = ({
    column: { filterValue = [], preFilteredRows, setFilter, id },
  }) => {
    const [min, max] = React.useMemo(() => {
      let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
      preFilteredRows.forEach(row => {
        min = Math.min(row.values[id], min)
        max = Math.max(row.values[id], max)
      })
      return [min, max]
    }, [id, preFilteredRows])
  
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '1em 0em 0em 0em'
        }}
      >
        <input
          value={filterValue[0] || ''}
          type="number"
          min="0"
          onChange={e => {
            const val = e.target.value
            setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
          }}
          placeholder={`Min (${min})`}
          style={{
            width: '120px',
            margin: '0em 0em 1em 0em'
          }}
        />
        <input
          value={filterValue[1] || ''}
          type="number"
          onChange={e => {
            const val = e.target.value
            setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
          }}
          placeholder={`Max (${max})`}
          style={{
            width: '120px',
          }}
        />
      </div>
    )
  }
