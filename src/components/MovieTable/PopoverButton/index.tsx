import { Dispatch, SetStateAction } from 'react';
import store from 'store';
import { Popover } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'hooks';
import { getMovies, setMovies } from 'states/moives';
import { deleteMovieItem } from 'services/movieAPI';
import styles from './popoverButton.module.scss';

interface IPopoverButtonProps {
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: Dispatch<SetStateAction<HTMLButtonElement | null>>;
  setOpenUpdateModal: Dispatch<React.SetStateAction<boolean>>;
  selectedItem: { id: number; type: string } | null;
  setSnackBarStatus: Dispatch<React.SetStateAction<string>>;
  setMessage: (text: string) => void;
}

const PopoverButton = ({
  anchorEl,
  setAnchorEl,
  setOpenUpdateModal,
  selectedItem,
  setSnackBarStatus,
  setMessage,
}: IPopoverButtonProps) => {
  const dispatch = useAppDispatch();

  const movies = useAppSelector(getMovies);
  const open = Boolean(anchorEl);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClickUpdate = () => {
    handlePopoverClose();
    setOpenUpdateModal(true);
  };

  const handleClickDelete = () => {
    handlePopoverClose();
    const storedAccessToken = store.get('accessToken');
    const myListId = store.get('myListId');
    if (!selectedItem || !storedAccessToken) return;

    deleteMovieItem(storedAccessToken, myListId, [{ media_type: selectedItem.type, media_id: selectedItem.id }])
      .then((response) => {
        if (response.data.success) {
          dispatch(setMovies(movies.filter((value) => value.id !== selectedItem.id)));
          setSnackBarStatus('');
          setMessage(`아이템을 제거하였습니다.`);
        }
      })
      .catch(() => {
        setSnackBarStatus('error');
        setMessage(`아이템 제거를 실패하였습니다.`);
      });
  };

  return (
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
  );
};

export default PopoverButton;
