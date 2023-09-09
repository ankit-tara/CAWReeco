import React from 'react';
import styled from 'styled-components';

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-top: solid 1px #ccc;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;

  thead {
    border-bottom: solid 1px #ccc;
    border-left: solid 1px #ccc;
    border-right: solid 1px #ccc;
  }
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
`;

const TableRow = styled.tr`
  border-bottom: solid 2px #ccc;
`;

const TableCell = styled.td`
  // padding: 12px;
`;

function Table({ children }) {
  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            {React.Children.map(children, (child) => {
              if (child.type === TableHeader) {
                return child;
              }
              return null;
            })}
          </tr>
        </thead>
        <tbody>
          {React.Children.map(children, (child) => {
            if (child.type === TableRow) {
              return child;
            }
            return null;
          })}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
}

export { Table, TableWrapper, StyledTable, TableHeader, TableRow, TableCell };

