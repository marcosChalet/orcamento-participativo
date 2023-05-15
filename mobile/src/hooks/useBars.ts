import BarType from '../core/bar.type';

type NCutGraphType = {
  areas: string[];
  type: 'YES-NO' | 'N-CUT';
  values: {[key: number]: number};
};

export default function useBars() {
  function getFormattedValue(value: number) {
    let finalCost = String(value.toFixed(2)).replace('.', ',');
    finalCost = finalCost.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&.');
    return finalCost;
  }

  function loadBarData(
    setSum: (T: number) => void,
    setItem: (T: BarType[]) => void,
    props: NCutGraphType,
  ) {
    let max = -1;
    let sum = 0;
    let results: BarType[] = [];
    if (props.type === 'N-CUT') {
      for (let i = 0; i < props.areas.length; i++) {
        if (props.values[i] > max) {
          max = props.values[i];
          sum += props.values[i];
        }
      }
    } else if (props.type === 'YES-NO') {
      for (const key in props.values) {
        if (props.values[key] > max) {
          max = props.values[key];
          sum += 1;
        }
      }
    }

    setSum(sum);

    if (props.type === 'N-CUT') {
      for (let i = 0; i < props.areas.length; i++) {
        let barWidth = {width: `${(100 * props.values[i]) / max}%`};
        results.push({
          title: props.areas[i].toUpperCase(),
          value: getFormattedValue(props.values[i]),
          style: barWidth,
        });
      }
    } else if (props.type === 'YES-NO') {
      let i = 0;
      for (const key in props.values) {
        let barWidth = {width: `${(100 * props.values[key]) / max}%`};
        results.push({
          title: props.areas[i].toUpperCase(),
          value: props.values[key],
          style: barWidth,
        });
        i += 1;
      }
    }

    setItem(results);
  }

  return {
    loadBarData,
    getFormattedValue,
  };
}
