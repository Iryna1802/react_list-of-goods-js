import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';
const ENTER_GOODS = goodsFromServer;

function filter(arr) {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== ENTER_GOODS[i]) {
      return false;
    }
  }

  return true;
}

function getPreparedGoods(goods, sortField, reverse) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [firstList, nextList] = useState(goodsFromServer);

  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(firstList, sortField, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            nextList(ENTER_GOODS);
            setSortField(SORT_FIELD_NAME);
          }}
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => {
            nextList(ENTER_GOODS);
            setSortField(SORT_FIELD_LENGTH);
          }}
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => {
            setSortField(sortField);
            // eslint-disable-next-line no-unused-expressions
            !reverse ? setReverse(true) : setReverse(false);
          }}
          className={cn('button is-warning', {
            'is-light': reverse === false,
          })}
        >
          Reverse
        </button>

        {!filter(visibleGoods) && (
          <button
            type="button"
            onClick={() => {
              setSortField('');
              nextList(ENTER_GOODS);
              setReverse(false);
            }}
            className={cn('button is-danger is-light')}
          >
            Reset
          </button>
        )}
      </div>

      <div>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good">{good}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
