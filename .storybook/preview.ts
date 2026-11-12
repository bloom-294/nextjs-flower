// @ts-ignore
import "tailwindcss/tailwind.css";
// @ts-ignore
import "swiper/css/bundle";

import type { Preview } from "@storybook/react";

const customHead = document.createElement('style');
customHead.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap');

  /* 全体のデフォルト（本文）にZen角ゴシックを適用 */
  body {
    font-family: 'Zen Kaku Gothic New', serif !important;
    font-weight: 400;
  }

  /* Zen角ゴシックを適用 */
  h1, h2, h3, h4, h5, h6,
  .font-gothic {
    font-family: 'Zen Kaku Gothic New', sans-serif !important;
    font-weight: 600;
  }

  .font-mincho {
    font-family: 'Shippori Mincho', serif !important;
    line-height: 1.8;
    font-weight: 800;
  }
`;
document.head.appendChild(customHead);

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Introduction',
          ['Storybookの運用方針'],
          'Guides',
          ['Gitの運用ルール'],
          'Design',
          ['デザインシステム（簡易版）'],
          'Components',        
          '*',                  
        ],
      },
    },
  },
};

export default preview;
