export function createMarkup(article) {
  return {
    type: 'div',
    children: [],
    key: null,
    props: {
      style: {
        display: 'flex',
        'flex-direction': 'column',
        gap: '1rem',
        'justify-content': 'space-between',
        padding: '2.5rem',
        'background-color': '#202124',
        color: '#ccc',
        height: '100%',
        'font-size': '18px',
        'font-family': 'Roboto',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              margin: 0,
            },
            children: [
              {
                type: 'h1',
                props: {
                  style: {
                    margin: 0,
                    width: 'auto',
                    'background-color': '#fff',
                    color: '#333',
                    'font-size': '4rem',
                    'font-weight': 700,
                  },
                  children: article.title,
                },
              },
            ],
          },
        },
        {
          type: 'p',
          props: {
            style: {
              'line-height': '1.25',
              'font-size': '2.5rem',
            },
            children: article.description,
          },
        },
        {
          type: 'small',
          props: {
            style: {
              color: '#aaa',
              'font-size': '2.5rem',
            },
            children: 'by Taylor Beseda',
          },
        },
        {
          type: 'small',
          props: {
            style: {
              color: '#5b5c5f',
              'font-size': '2rem',
            },
            children: `tbeseda.com/blog/${article.slug.current}`,
          },
        },
      ],
    },
  }
}
