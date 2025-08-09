import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { PageTitle } from './PageTitle';
import {
  deleteArticleThunk,
  fetchArticles,
  optimisticDeleteArticle,
} from '../redux/articles/slice';
import { BiLike } from 'react-icons/bi';
import { GrView } from 'react-icons/gr';
import { MdDelete } from 'react-icons/md';
import { FaBookOpen, FaEdit } from 'react-icons/fa';
import { Status } from '../types/apiTypes';
import { SpinnerLoading } from './SpinnerLoading';
import { CgSpinner } from 'react-icons/cg';
import ErrorDisplay from './ErrorDisplay';
import { Link } from 'react-router-dom';
import { displayLocalTime } from '../utils/displayLocalTime';
import { addToast } from '../redux/toast/slice';
import { Pagination } from './Pagination';
import { ToggleSortButton } from './ToggleSortButton';
import { setCategories, setStartIndex } from '../redux/filters/slice';
import { CustomSelect } from './CustomSelect';
import { CATEGORIES } from '../constants/categories';
import { LimitSelector } from './LimitSelector';

export const DashArticles = () => {
  const dispatch = useAppDispatch();
  const { items, lastMonthArticles, totalArticles, status } = useAppSelector(
    (state) => state.article
  );

  const { startIndex, limit, order, categories, searchTerm } = useAppSelector(
    (state) => state.filters
  );

  const handleNextPageClick = () => {
    if (startIndex + 1 + limit < totalArticles) {
      const newStartIndex = startIndex + limit;
      dispatch(setStartIndex(newStartIndex));
    }
  };

  const handlePreviousPageClick = () => {
    if (startIndex + 1 > limit) {
      const newStartIndex = startIndex - limit;
      dispatch(setStartIndex(newStartIndex));
    }
  };

  const handleSelectedPageClick = (num: number) => {
    dispatch(setStartIndex(num * limit));
  };

  const handleDeleteArticle = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }

    dispatch(optimisticDeleteArticle(id));

    try {
      await dispatch(deleteArticleThunk(id)).unwrap();
      dispatch(addToast({ color: 'success', text: 'Article deleted successfully' }));
      dispatch(fetchArticles());
    } catch (err) {
      console.error('Failed to delete article:', err);
      dispatch(addToast({ color: 'error', text: 'Failed to delete article' }));
      dispatch(fetchArticles());
    }
  };

  useEffect(() => {
    dispatch(
      fetchArticles({
        startIndex,
        limit,
        order,
        categories,
        searchTerm,
      })
    );
  }, [dispatch, startIndex, limit, order, categories, searchTerm]);

  const isSuccess = status === Status.SUCCESS;
  const isLoading = status === Status.LOADING;
  const isError = status === Status.ERROR;

  return (
    <div className="flex flex-col gap-6 py-10 px-5">
      <PageTitle size="sm">Articles</PageTitle>
      <p className="text-center">Here is all the articles on the platform</p>
      <div className="flex flex-col gap-4">
        <span className="flex items-center gap-1.5">
          last month articles:{' '}
          {isLoading ? <CgSpinner className="animate-spin" /> : lastMonthArticles}
        </span>
        <span className="flex items-center gap-1.5">
          totalArticles: {isLoading ? <CgSpinner className="animate-spin" /> : totalArticles}
        </span>
      </div>
      {isLoading && <SpinnerLoading className="static" />}
      {isError && <ErrorDisplay errorMessage="Can not get the articles..." />}
      {isSuccess && (
        <>
          <div className="flex flex-col gap-5 flex-wrap">
            <ToggleSortButton />
            <CustomSelect
              name="categories"
              labelText="Categories"
              options={CATEGORIES}
              selected={categories}
              onChange={(newSelected) => dispatch(setCategories(newSelected))}
            />
            <LimitSelector options={[5, 10, 20, 50]} />
          </div>

          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <li key={item._id} className="border p-4 rounded-md flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h5>{item.title}</h5>
                  <div className="flex gap-5">
                    <button className="flex gap-1 items-center">
                      <BiLike />
                      <span>{item.likesCount}</span>
                    </button>
                    <button className="flex gap-1 items-center">
                      <GrView />
                      <span>{item.viewsCount}</span>
                    </button>
                  </div>
                </div>
                <div className="flex gap-1 italic text-sm text-gray-400">
                  <span>by {item.user.username}</span>
                  <span>at {displayLocalTime(item.createdAt)}</span>
                </div>
                <ul className="flex gap-2">
                  {item.categories.map((category) => (
                    <li key={category} className="p-1 rounded-md bg-gray-600">
                      {category}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-5">
                  <Link
                    to={`/articles/${item.slug}`}
                    className="flex gap-1 items-center cursor-pointer text-gray-400 transition duration-300 ease-in-out hover:text-gray-100"
                  >
                    <FaBookOpen />
                    <span>Read</span>
                  </Link>
                  <button className="flex gap-1 items-center cursor-pointer text-gray-400 transition duration-300 ease-in-out hover:text-gray-100">
                    <FaEdit />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteArticle(item._id)}
                    className="flex gap-1 items-center ml-auto mr-0 hover:text-red-600 cursor-pointer transition duration-300 ease-in-out"
                  >
                    <MdDelete />
                    <span>Delete</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {items.length === 0 && <p>There is no articles found by these filters</p>}
          {isSuccess && totalArticles > limit && (
            <Pagination
              totalPages={Math.ceil(totalArticles / limit)}
              currentPage={(startIndex + limit) / limit}
              handleNextPage={() => console.log('next')}
              handlePreviousPage={() => console.log('right')}
              handlePageClick={() => console.log('current')}
            />
          )}
        </>
      )}
    </div>
  );
};
