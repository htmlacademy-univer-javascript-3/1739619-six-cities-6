import {useState} from 'react';
import {SORTING_OPTIONS, SortingOption} from '../../const.ts';

type SortingOptionsProps = {
  activeSort: SortingOption;
  onSortChange: (option: SortingOption) => void;
};

export default function SortingOptions({activeSort, onSortChange}: SortingOptionsProps) {
  const [isOpened, setIsOpened] = useState(false);

  const handleToggle = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  const handleOptionSelect = (option: SortingOption) => () => {
    onSortChange(option);
    setIsOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggle}
      >
        {activeSort}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`.trim()}
        role="listbox"
      >
        {SORTING_OPTIONS.map((option) => (
          <li
            key={option}
            className={`places__option ${option === activeSort ? 'places__option--active' : ''}`.trim()}
            tabIndex={0}
            onClick={handleOptionSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}
