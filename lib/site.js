export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://studiodesbin.github.io/page/').replace(/\/?$/, '/');
export const socialImageUrl = new URL('social-preview.jpg', siteUrl).href;
