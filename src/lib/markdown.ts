import { marked } from 'marked';
import { sanitizeHtml } from '../lib/sanitizer';

export const convertMarkdownToHtml = (markdown: string): string => {
  const rawHtml = marked.parse(markdown, { async: false });
  return sanitizeHtml(rawHtml);
};
