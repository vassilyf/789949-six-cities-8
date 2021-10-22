import {MouseEvent} from 'react';
import {Points} from '../../types/types';

type ListProps = {
  points: Points;
  onListItemHover: (listItemName: string) => void;
};

export function List(props: ListProps): JSX.Element {
  const {points, onListItemHover} = props;

  const listItemHoverHandler = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    onListItemHover(event.currentTarget.innerText);
  };

  return (
    <ul className="list">
      {points.map((point, index) => {
        const keyValue = `${index}-${point.title}`;
        return (
          <li
            className="list__item"
            key={keyValue}
            onMouseEnter={listItemHoverHandler}
          >
            {point.title}
          </li>
        );
      })}
    </ul>
  );
}
