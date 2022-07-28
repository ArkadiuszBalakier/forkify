import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );

    // Page 1 , and there are others pages
    if (curPage === 1 && numPages > 1) {
      return this._generateBtnNext(curPage);
    }

    //last page
    if (curPage === numPages && numPages > 1) {
      return this._generateBtnBack(curPage);
    }

    //other page
    if (curPage < numPages) {
      return this._generateBtnNextandBack(curPage);
    }
    //page 1 , and there are NO others pages
    return '';
  }

  _generateBtnBack(pageNr) {
    return `
         <button data-goto="${
           pageNr - 1
         }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${pageNr - 1}</span>
          </button>
      `;
  }

  _generateBtnNext(pageNr) {
    return `
    <button data-goto="${pageNr + 1}" class="btn--inline pagination__btn--next">
      <span>Page ${pageNr + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
`;
  }

  _generateBtnNextandBack(pageNr) {
    return `
         <button data-goto="${
           pageNr - 1
         }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${pageNr - 1}</span>
          </button>

          <button data-goto="${
            pageNr + 1
          }" class="btn--inline pagination__btn--next">
          <span>Page ${pageNr + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
          </button>
      `;
  }
}

export default new PaginationView();
