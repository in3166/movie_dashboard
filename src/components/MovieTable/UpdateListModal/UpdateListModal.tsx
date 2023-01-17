import { useState, Dispatch } from 'react';
import store from 'store';

import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getComments, setComments } from 'states/moives';
import { updateMovieItem } from 'services/movieAPI';
import Modal from './Modal';
import styles from './updateListModal.module.scss';

interface IUpdateListModalProps {
  onClose: () => void;
  item: any;
  setSnackBarStatus: Dispatch<React.SetStateAction<string>>;
  setMessage: (text: string) => void;
}

const UpdateListModal = ({ onClose, item, setSnackBarStatus, setMessage }: IUpdateListModalProps) => {
  const dispatch = useAppDispatch();

  const comments = useAppSelector(getComments);
  const { comment, id, type } = comments.filter((value) => value.id === item.id)[0];

  const [inputComment, setInputComment] = useState(comment ?? '');

  const handleClickUpdate = async () => {
    const storedAccessToken = store.get('accessToken');
    const myListId = store.get('myListId');
    if (!storedAccessToken) return;

    updateMovieItem(storedAccessToken, myListId, [{ media_type: type, media_id: id, comment: inputComment }])
      .then((response) => {
        if (response.data.success) {
          const tempComments = comments.filter((value) => value.id !== item.id);
          dispatch(setComments([...tempComments, { comment: inputComment, id, type }]));
          setSnackBarStatus('');
          setMessage('Comment를 수정하였습니다.');
        }
      })
      .catch(() => {
        setSnackBarStatus('error');
        setMessage('Comment 수정을 실패하였습니다.');
      })
      .finally(() => {
        onClose();
      });
  };

  return (
    <Modal onCancel={onClose}>
      <header className={styles.header}>Update Comment</header>
      <form className={styles.content}>
        <textarea rows={3} value={inputComment} onChange={(e) => setInputComment(e.currentTarget.value)} />
      </form>
      <footer className={styles.footer}>
        <button type='button' aria-label='close the update modal' className={styles.cancelButton} onClick={onClose}>
          취소
        </button>
        <button
          type='button'
          aria-label='update item comment'
          className={styles.updateButton}
          onClick={handleClickUpdate}
        >
          수정
        </button>
      </footer>
    </Modal>
  );
};

export default UpdateListModal;
