/* The index. One line per thing that happens, newest first.
   To add one: copy an entry, change the words, drop the image in /public. */

export type Entry = {
  number: string;   // running number, e.g. '002'
  kind: string;     // Occasion, Exhibition, Collection...
  title: string;
  date: string;     // shown as written
  image: string;    // one image, from /public
  alt: string;
  caption: string;  // one or two lines
  href: string;     // the full page
  linkLabel?: string;
};

export const ENTRIES: Entry[] = [
  {
    number: '001',
    kind: 'Occasion',
    title: 'MaiSake at 1014 Gallery',
    date: '9 July 2026',
    image: '/occasion-001-01.jpg',
    alt: 'A guest before one of the photographs at Occasion 001',
    caption:
      'An intimate sake tasting presented by Erika Haigh and Mai, surrounded by Still Formation, Jess Gough’s solo show.',
    href: '/occasions',
    linkLabel: 'View the occasion',
  },
];
