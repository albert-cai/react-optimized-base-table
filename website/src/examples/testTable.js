const columns = generateColumns(200)
let data = generateData(columns, 200)
const expandColumnKey = 'column-0'
for (let i = 0; i < 1000; i++) {
  data.push({
    ...data[0],
    id: `${data[0].id}-sub-${i}`,
    parentId: data[0].id,
    [expandColumnKey]: `Sub ${i}`,
  })
  data.push({
    ...data[2],
    id: `${data[2].id}-sub-${i}`,
    parentId: data[2].id,
    [expandColumnKey]: `Sub ${i}`,
  })
  data.push({
    ...data[2],
    id: `${data[2].id}-sub-sub-${i}`,
    parentId: `${data[2].id}-sub-${i}`,
    [expandColumnKey]: `Sub-Sub ${i}`,
  })
}
const treeData = unflatten(data)
const fixedColumns = columns.map((column, columnIndex) => {
  let frozen
  if (columnIndex < 2) frozen = Column.FrozenDirection.LEFT
  return {
    ...column,
    frozen,
    resizable: true,
    style: {
      borderBottom: '1px solid #e9e9e9',
      borderRight: '1px solid #e9e9e9',
    },
  }
})

export default () => (
  <Table
    width={1000}
    fixed
    columns={fixedColumns}
    data={treeData}
    rowHeight={30}
    headerHeight={40}
    expandColumnKey={expandColumnKey}
    defaultExpandedRowKeys={['row-0']}
    onRowExpand={action('onRowExpand')}
    onExpandedRowsChange={action('onExpandedRowsChange')}
  />
)
