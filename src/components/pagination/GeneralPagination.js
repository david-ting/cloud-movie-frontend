import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";

function GeneralPagination(props) {
  const { currentPage, totalPages, path } = props;

  const previousPath = `${path}/${
    currentPage === 1 ? currentPage : currentPage - 1
  }`;
  const nextPath = `${path}/${
    currentPage === totalPages ? currentPage : currentPage + 1
  }`;

  let pagesHTML = [];
  let displayPages = [];
  let middle;

  if (currentPage === 1) {
    if (totalPages % 2 === 0) {
      middle = totalPages / 2;
    } else {
      middle = Math.floor(totalPages / 2);
    }
  } else {
    middle = currentPage;
  }

  if (totalPages <= 7) {
    for (let i = 1; i < totalPages + 1; i++) {
      displayPages.push(i);
    }
  } else {
    displayPages.push(1, 2);

    if (currentPage >= totalPages - 4) {
      displayPages.push("breakLeft");
      displayPages.push(totalPages - 4, totalPages - 3, totalPages - 2);
    } else if (currentPage !== 2) {
      if (currentPage !== 3) displayPages.push("breakLeft");
      displayPages.push(middle, middle + 1, middle + 2);
    } else {
      displayPages.push(middle + 1, middle + 2);
    }

    if (currentPage < totalPages - 4 && middle + 4 !== totalPages)
      displayPages.push("breakRight");
    displayPages.push(totalPages - 1, totalPages);
  }

  for (let i = 0; i < displayPages.length; i++) {
    if (isNaN(displayPages[i])) {
      pagesHTML.push(
        <li
          className="page-item ml-1 mr-1 d-flex align-items-center"
          key={displayPages[i]}
        >
          <BsThreeDots />
        </li>
      );
    } else {
      pagesHTML.push(
        <li
          className={`page-item ${
            displayPages[i] === currentPage ? "active" : null
          }`}
          key={displayPages[i]}
        >
          <Link className="page-link" to={`${path}/${displayPages[i]}`}>
            {displayPages[i]}
          </Link>
        </li>
      );
    }
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <Link className="page-link" aria-label="Previous" to={previousPath}>
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>
        {pagesHTML}
        <li className="page-item">
          <Link className="page-link" aria-label="Next" to={nextPath}>
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default GeneralPagination;
