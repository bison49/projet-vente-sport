/* eslint-disable @typescript-eslint/no-explicit-any */
import './pagination.css';
export default function Pagination(
  setPage: (arg0: any) => void,
  setCurrentPage: (arg0: number) => void,
  hydra: { [x: string]: any },
  currentPage: number,
  totalPages: number,
  page: string,
) {
  function setParameters(valuePage: string, current: number) {
    setPage(valuePage);
    setCurrentPage(current);
  }
  return (
    <div>
      {' '}
      <button
        id="first-page"
        className={currentPage === 1 ? 'pagination-button-selected' : 'pagination-button'}
        onClick={() => setParameters(hydra['hydra:first'], 1)}
      >
        1
      </button>
      {currentPage + 1 > 4 && <span>...</span>}
      {currentPage > 2 ? (
        <button
          id="previous-page"
          className="pagination-button"
          onClick={() => setParameters(hydra['hydra:previous'], currentPage - 1)}
        >
          {currentPage - 1}
        </button>
      ) : null}
      {(currentPage > 1 && totalPages > 1 && currentPage !== totalPages) ||
      (currentPage > 1 && totalPages === 2) ? (
        <button
          id="page"
          className="pagination-button-selected"
          onClick={() => setParameters(hydra['@id'], currentPage)}
        >
          {currentPage}
        </button>
      ) : null}
      {(totalPages > 1 && currentPage < totalPages - 1) ||
      (currentPage === 1 && totalPages === 2) ? (
        <button
          id="next-page"
          className="pagination-button"
          onClick={() => setParameters(hydra['hydra:next'], currentPage + 1)}
        >
          {currentPage + 1}
        </button>
      ) : null}
      {totalPages - currentPage > 2 && <span>...</span>}
      {totalPages > 2 ? (
        <button
          id="last-page"
          className={
            currentPage === totalPages
              ? 'pagination-button-selected'
              : 'pagination-button'
          }
          onClick={() => setParameters(hydra['hydra:last'], totalPages)}
        >
          last
        </button>
      ) : null}
    </div>
  );
}
