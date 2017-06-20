export const dataFilters = [
  {
    label: '选项',
    values: [
      {
        label: '全部',
        name: 'all'
      },
      {
        label: '选项1',
        name: 'xuanxiang1'
      },
      {
        label: '选项2',
        name: 'xuanxiang2'
      },
      {
        label: '选项3',
        name: 'xuanxiang3'
      },
      {
        label: '选项4',
        name: 'xuanxiang4'
      }
    ]
  },
  {
    label: '苹果',
    values: [
      {
        label: '全部',
        name: 'all'
      },
      {
        label: '苹果1',
        name: 'pingguo1'
      },
      {
        label: '苹果2',
        name: 'pingguo2'
      },
      {
        label: '苹果3',
        name: 'pingguo3'
      },
      {
        label: '苹果4',
        name: 'pingguo4'
      }
    ]
  },
  {
    label: '菠萝',
    values: [
      {
        label: '全部',
        name: 'all'
      },
      {
        label: '菠萝1',
        name: 'boluo1'
      },
      {
        label: '菠萝2',
        name: 'boluo2'
      },
      {
        label: '菠萝3',
        name: 'boluo3'
      },
      {
        label: '菠萝4',
        name: 'boluo4'
      },
      {
        label: '菠萝5',
        name: 'boluo5'
      },
      {
        label: '菠萝6',
        name: 'boluo6'
      },
      {
        label: '很多菠萝',
        name: 'henduoboluo'
      }
    ]
  }
]

export function initFilters(dataFilters) {
  const filters = {}
  dataFilters.forEach((item) => {
    filters[item.label] = item.values[0]
  })
  return filters
}
