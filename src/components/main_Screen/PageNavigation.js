import React from 'react';

const PageNavigation = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (e) => {
    const newPageValue = parseInt(e.target.value); 
    onPageChange(newPageValue); 
  };
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="page-navigation-container">
      <div className="page-navigation">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          &lt; Previous
        </button>
        <span>
          Page <input type="number" value={currentPage} onChange={handlePageChange} className='centered-input'/> of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default PageNavigation;
