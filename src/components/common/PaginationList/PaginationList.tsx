import { FC, useState, useEffect, ChangeEvent } from 'react';
import Pagination from '@mui/material/Pagination';
import styles from './paginationList.module.scss';

interface Props {
  page: number;
  total: number;
  limit: number;
  handleChange: (event: ChangeEvent<any>, page: number) => void;
}

const PaginationList: FC<Props> = ({ page, total, limit, handleChange }) => {
  const [numberPage, setNumberPage] = useState(0);

  useEffect(() => {
    const result = total / limit;
    setNumberPage(Math.ceil(result));
  }, [total]);

  return (
    <div className={styles.pagination}>
      {numberPage !== 1 && (
        <Pagination
          page={page}
          color="secondary"
          count={numberPage}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default PaginationList;
