import { ChangeEvent, MouseEvent, useState, ReactNode } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  Paper,
  TablePagination,
  TableRow,
  Popover,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TablePaginationActions from './TablePaginationActions';
import styles from './table.module.scss';
import { cx } from 'styles';

type TableProps<T extends object> = {
  filter: string;
  columns: Record<
    string,
    {
      name: string;
      width: string;
      accessor: (data: T) => ReactNode | string | undefined;
    }
  >;
  rows: (T & { id: number })[];
};

const CustomPaginationActionsTable = <T extends object>(props: TableProps<T>) => {
  const { columns, rows, filter } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedPopoverItem, setSelectedPopoverItem] = useState<number | null>(null);

  const handlePopoverClick = (event: MouseEvent<HTMLButtonElement>, id: number) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedPopoverItem(id);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const [selectedRow, setSelectedRow] = useState<number[]>([]);
  const handleRowClick = (id: number) => {
    const remove = selectedRow.includes(id);
    if (remove) {
      setSelectedRow((prev) => prev.filter((value) => value !== id));
    } else {
      setSelectedRow((prev) => [...prev, id]);
    }
  };

  const open = Boolean(anchorEl);

  const handleClickAdd = () => {
    console.log(selectedRow);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label='custom pagination table'>
        <TableHead>
          <TableRow>
            {Object.keys(columns).map((key) => {
              const { name, width } = columns[key];
              return (
                <TableCell align='center' width={width} key={key}>
                  {name}
                </TableCell>
              );
            })}
            <TableCell width={20} />
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row) => {
            return (
              <TableRow
                key={row.id}
                onClick={() => handleRowClick(row.id)}
                className={cx({
                  [styles.row]: true,
                  [styles.linkTr]: filter === 'people',
                  [styles.selectedRow]: selectedRow.includes(row.id),
                })}
              >
                {Object.keys(columns).map((key) => {
                  const { accessor } = columns[key];
                  return (
                    <TableCell key={key} align='center'>
                      {accessor(row)}
                    </TableCell>
                  );
                })}
                <TableCell align='center'>
                  <button type='button' onClick={(event) => handlePopoverClick(event, row.id)}>
                    <MoreVertIcon fontSize='small' className={styles.rowButton} />
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
          {rows.length === 0 && (
            <TableRow>
              <TableCell align='center' colSpan={6}>
                No Items.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter className={styles.tableFooter}>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={5}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div>
          <button type='button' className={styles.popButton}>
            수정
          </button>
        </div>
        <div>
          <button type='button' className={styles.popButton} onClick={handleClickAdd}>
            삭제
          </button>
        </div>
      </Popover>
    </TableContainer>
  );
};

export default CustomPaginationActionsTable;
