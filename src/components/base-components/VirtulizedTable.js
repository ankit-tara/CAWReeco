import React from "react";
import { Column, Table, AutoSizer } from "react-virtualized";
const ROW_HEIGHT = 48;

function VirtulizedTable({ rows, columns }) {
  const getRowStyles = ({ index }) => {
    const isEdit = Boolean(rows[index]?.isEdit);
    return {
      display: "flex",
      alignItems: "center",
      boxSizing: "border-box",
      boxShadow: isEdit
        ? "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)"
        : "none",
    };
  };

  const headerRenderer = ({ label }) => <div>{label}</div>;

  return (
    <AutoSizer>
      {({ width }) => (
        <Table
          height={380}
          width={width}
          rowHeight={ROW_HEIGHT}
          headerHeight={ROW_HEIGHT}
          rowClassName="row"
          rowStyle={getRowStyles}
          rowCount={rows.length}
          rowGetter={({ index }) => rows[index]}
        >
          {columns.map(({ dataKey, cellRenderer, ...other }) => {
            return (
              <Column
                style={{
                  display: "flex",
                  alignItems: "center",
                  boxSizing: "border-box",
                }}
                key={dataKey}
                headerRenderer={headerRenderer}
                cellRenderer={cellRenderer}
                dataKey={dataKey}
                {...other}
              />
            );
          })}
        </Table>
      )}
    </AutoSizer>
  );
}

export default VirtulizedTable;
