import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SortingOptions from './sorting-options';
import { SORTING_OPTIONS } from '../../const';

describe('Component: SortingOptions', () => {
  it('should render active sort in control', () => {
    const { container } = render(
      <SortingOptions activeSort={SORTING_OPTIONS[0]} onSortChange={vi.fn()} />
    );

    const control = container.querySelector('.places__sorting-type');
    expect(control).not.toBeNull();
    expect(control).toHaveTextContent(SORTING_OPTIONS[0]);
  });

  it('should be closed by default', () => {
    render(<SortingOptions activeSort={SORTING_OPTIONS[0]} onSortChange={vi.fn()} />);

    const list = screen.getByRole('listbox');
    expect(list).not.toHaveClass('places__options--opened');
  });

  it('should toggle options list on click', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <SortingOptions activeSort={SORTING_OPTIONS[0]} onSortChange={vi.fn()} />
    );

    const control = container.querySelector('.places__sorting-type') as HTMLElement;
    const list = screen.getByRole('listbox');

    await user.click(control);
    expect(list).toHaveClass('places__options--opened');

    await user.click(control);
    expect(list).not.toHaveClass('places__options--opened');
  });

  it('should call onSortChange with selected option and close list', async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();

    const { container } = render(
      <SortingOptions activeSort={SORTING_OPTIONS[0]} onSortChange={onSortChange} />
    );

    const control = container.querySelector('.places__sorting-type') as HTMLElement;
    const list = screen.getByRole('listbox');

    await user.click(control);
    expect(list).toHaveClass('places__options--opened');

    const nextOption = SORTING_OPTIONS[1];

    const optionItems = container.querySelectorAll('.places__option');
    const nextLi = Array.from(optionItems).find((li) => li.textContent?.trim() === nextOption) as HTMLElement;

    await user.click(nextLi);

    expect(onSortChange).toHaveBeenCalledTimes(1);
    expect(onSortChange).toHaveBeenCalledWith(nextOption);
    expect(list).not.toHaveClass('places__options--opened');
  });

  it('should mark active option with active class', () => {
    const active = SORTING_OPTIONS[0];
    const { container } = render(<SortingOptions activeSort={active} onSortChange={vi.fn()} />);

    const activeLi = container.querySelector('.places__option--active') as HTMLElement;
    expect(activeLi).toHaveTextContent(active);
  });
});
