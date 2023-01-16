import { ChangeEvent, MouseEvent, useState } from 'react';
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
import store from 'store';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getSelectedMovies, setSelectedMovies } from 'states/moives';
import axios from 'axios';
import { MOVIE_API_URL } from 'features';
import { useLocation } from 'react-router-dom';
import { columns } from './column';

type TableProps<T extends object> = {
  filter: string;
  rows: (T & { id: number; media_type?: string })[];
};

const CustomPaginationActionsTable = <T extends object>(props: TableProps<T>) => {
  const { rows, filter } = props;
  console.log(filter);
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
  const open = Boolean(anchorEl);

  const handlePopoverClick = (event: MouseEvent<HTMLButtonElement>, id: number) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedPopoverItem(id);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useAppDispatch();
  const selectedMovies = useAppSelector(getSelectedMovies);

  const locator = useLocation();

  const handleClickRow = (id: number) => {
    const remove = selectedMovies.some((value) => value.id === id);
    if (locator.pathname !== '/search') return;
    if (remove) {
      dispatch(setSelectedMovies(selectedMovies.filter((value) => value.id !== id)));
    } else {
      dispatch(setSelectedMovies([...selectedMovies, { media_type: filter, id }]));
    }
  };

  const handleClickUpdate = () => {
    handlePopoverClose();
  };

  const handleClickDelete = () => {
    const storedAccessToken = store.get('accessToken');
    axios
      .delete(`${MOVIE_API_URL}/4/list/8235984/items`, {
        data: {
          items: [{ media_type: 'movie', media_id: selectedPopoverItem }],
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedAccessToken}`,
        },
      })
      .then((res) => {
        handlePopoverClose();
        // dispatch(setMovies());
      })
      .catch((err) => {
        console.log('err:', err);
      });
  };

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
                    <button type='button' onClick={(event) => handlePopoverClick(event, row.id)}>
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
          <button type='button' className={styles.popButton} onClick={handleClickUpdate}>
            수정
          </button>
        </div>
        <div>
          <button type='button' className={styles.popButton} onClick={handleClickDelete}>
            삭제
          </button>
        </div>
      </Popover>
    </TableContainer>
  );
};

export default CustomPaginationActionsTable;
