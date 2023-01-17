import { ChangeEvent, MouseEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppSelector, useAppDispatch } from 'hooks';
import { getSelectedMovies, setSelectedMovies } from 'states/moives';
import { columns } from './column';
import UpdateListModal from './UpdateListModal/UpdateListModal';
import TablePaginationActions from './TablePaginationActions';
import PopoverButoon from './PopoverButton';
import { cx } from 'styles';
import styles from './table.module.scss';

type TableProps<T extends object> = {
  filter: string;
  rows: (T & { id: number; media_type?: string })[];
};

const CustomPaginationActionsTable = <T extends object>(props: TableProps<T>) => {
  const { rows, filter } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useAppDispatch();

  const handleChangePage = (_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const locator = useLocation();
  const selectedMovies = useAppSelector(getSelectedMovies);
  const handleClickRow = (id: number) => {
    const remove = selectedMovies.some((value) => value.id === id);
    if (locator.pathname !== '/search') return;
    if (remove) {
      dispatch(setSelectedMovies(selectedMovies.filter((value) => value.id !== id)));
    } else {
      dispatch(setSelectedMovies([...selectedMovies, { media_type: filter, id }]));
    }
  };

  const [selectedPopoverItem, setSelectedPopoverItem] = useState<{ id: number; type: string } | null>(null);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handlePopoverClick = (event: MouseEvent<HTMLButtonElement>, id: number, type: string) => {
    event.stopPropagation();
    setPopoverAnchorEl(event.currentTarget);
    setSelectedPopoverItem({ id, type });
  };

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label='pagination table'>
        <TableHead>
          <TableRow>
            {Object.keys(columns[filter]).map((key) => {
              const { name, width } = columns[filter][key];
              return (
                <TableCell align='center' width={width} key={key}>
                  {name}
                </TableCell>
              );
            })}
            {locator.pathname !== '/search' && <TableCell width={20} />}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rows.length > 0 && rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => {
            return (
              <TableRow
                key={row.id}
                onClick={() => handleClickRow(row.id)}
                className={cx({
                  [styles.row]: true,
                  [styles.selectedRow]: selectedMovies.some((value) => value.id === row.id), // TODO: 여기서 체크?
                })}
              >
                {Object.keys(columns[row?.media_type || filter]).map((key) => {
                  const { accessor } = columns[row?.media_type || filter][key];
                  return (
                    <TableCell key={key} align='center'>
                      {accessor(row)}
                    </TableCell>
                  );
                })}
                {locator.pathname !== '/search' && (
                  <TableCell align='center'>
                    <button
                      type='button'
                      onClick={(event) => handlePopoverClick(event, row.id, row?.media_type || filter)}
                    >
                      <MoreVertIcon fontSize='small' className={styles.rowButton} />
                    </button>
                  </TableCell>
                )}
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
      <PopoverButoon
        anchorEl={popoverAnchorEl}
        setAnchorEl={setPopoverAnchorEl}
        setOpenUpdateModal={setOpenUpdateModal}
        selectedItem={selectedPopoverItem}
      />
      {openUpdateModal && <UpdateListModal onClose={() => setOpenUpdateModal(false)} item={selectedPopoverItem} />}
    </TableContainer>
  );
};

export default CustomPaginationActionsTable;
